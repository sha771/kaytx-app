/**
 * Offline Service
 * Handles offline data storage, synchronization, and queueing
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export interface OfflineQueueItem {
  id: string;
  type: 'api_request' | 'realtime_event' | 'sync_operation';
  endpoint?: string;
  method?: string;
  data?: any;
  timestamp: number;
  retries: number;
  maxRetries: number;
  priority: 'low' | 'medium' | 'high';
}

export interface SyncStatus {
  online: boolean;
  lastSync: number | null;
  pendingItems: number;
  failedItems: number;
  syncing: boolean;
}

class OfflineService {
  private queue: OfflineQueueItem[] = [];
  private isOnline = true;
  private syncStatus: SyncStatus = {
    online: true,
    lastSync: null,
    pendingItems: 0,
    failedItems: 0,
    syncing: false,
  };
  private syncTimer: ReturnType<typeof setInterval> | null = null;
  private listeners: ((status: SyncStatus) => void)[] = [];

  constructor() {
    this.loadQueue();
    this.setupNetworkListener();
    this.startSyncTimer();
  }

  /**
   * Setup network status listener
   */
  private setupNetworkListener() {
    // In a real app, you'd use @react-native-community/netinfo
    // For now, we'll use a simple approach
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.updateSyncStatus();
        this.processQueue();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.updateSyncStatus();
      });
    }
  }

  /**
   * Load queued items from storage
   */
  private async loadQueue() {
    try {
      const stored = await AsyncStorage.getItem('offline_queue');
      if (stored) {
        this.queue = JSON.parse(stored);
        this.updateSyncStatus();
      }
    } catch (error) {
      console.error('Failed to load offline queue:', error);
    }
  }

  /**
   * Save queue to storage
   */
  private async saveQueue() {
    try {
      await AsyncStorage.setItem('offline_queue', JSON.stringify(this.queue));
    } catch (error) {
      console.error('Failed to save offline queue:', error);
    }
  }

  /**
   * Update sync status and notify listeners
   */
  private updateSyncStatus() {
    this.syncStatus = {
      online: this.isOnline,
      lastSync: this.syncStatus.lastSync,
      pendingItems: this.queue.filter(item => item.retries < item.maxRetries).length,
      failedItems: this.queue.filter(item => item.retries >= item.maxRetries).length,
      syncing: this.syncStatus.syncing,
    };

    this.listeners.forEach(listener => listener(this.syncStatus));
  }

  /**
   * Add item to offline queue
   */
  async queueRequest(
    endpoint: string,
    method: string,
    data: any,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<void> {
    const item: OfflineQueueItem = {
      id: crypto.randomUUID(),
      type: 'api_request',
      endpoint,
      method,
      data,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 3,
      priority,
    };

    this.queue.push(item);
    this.queue.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    await this.saveQueue();
    this.updateSyncStatus();

    if (this.isOnline) {
      this.processQueue();
    }
  }

  /**
   * Queue real-time event for later synchronization
   */
  async queueRealtimeEvent(event: string, data: any): Promise<void> {
    const item: OfflineQueueItem = {
      id: crypto.randomUUID(),
      type: 'realtime_event',
      data: { event, data },
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 1, // Real-time events are only tried once
      priority: 'low',
    };

    this.queue.push(item);
    await this.saveQueue();
    this.updateSyncStatus();
  }

  /**
   * Queue sync operation
   */
  async queueSyncOperation(operation: string, data: any): Promise<void> {
    const item: OfflineQueueItem = {
      id: crypto.randomUUID(),
      type: 'sync_operation',
      data: { operation, data },
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 5,
      priority: 'medium',
    };

    this.queue.push(item);
    await this.saveQueue();
    this.updateSyncStatus();

    if (this.isOnline) {
      this.processQueue();
    }
  }

  /**
   * Process queued items
   */
  private async processQueue() {
    if (!this.isOnline || this.syncStatus.syncing) {
      return;
    }

    this.syncStatus.syncing = true;
    this.updateSyncStatus();

    const itemsToProcess = this.queue.filter(item => item.retries < item.maxRetries);

    for (const item of itemsToProcess) {
      try {
        await this.processItem(item);
        
        // Remove successfully processed item
        this.queue = this.queue.filter(i => i.id !== item.id);
        this.syncStatus.lastSync = Date.now();
      } catch (error) {
        console.error('Failed to process queue item:', error);
        
        // Increment retry count
        item.retries++;
        
        // Remove item if max retries reached
        if (item.retries >= item.maxRetries) {
          this.queue = this.queue.filter(i => i.id !== item.id);
          
          // Show error notification for failed items
          Alert.alert(
            'Sync Failed',
            `Failed to sync ${item.type}. Please try again later.`,
            [{ text: 'OK' }]
          );
        }
      }
    }

    await this.saveQueue();
    this.syncStatus.syncing = false;
    this.updateSyncStatus();
  }

  /**
   * Process individual queue item
   */
  private async processItem(item: OfflineQueueItem): Promise<void> {
    switch (item.type) {
      case 'api_request':
        await this.processApiRequest(item);
        break;
      case 'realtime_event':
        await this.processRealtimeEvent(item);
        break;
      case 'sync_operation':
        await this.processSyncOperation(item);
        break;
    }
  }

  /**
   * Process API request
   */
  private async processApiRequest(item: OfflineQueueItem): Promise<void> {
    if (!item.endpoint || !item.method) {
      throw new Error('Invalid API request item');
    }

    const response = await fetch(item.endpoint, {
      method: item.method,
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if needed
      },
      body: item.data ? JSON.stringify(item.data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
  }

  /**
   * Process real-time event
   */
  private async processRealtimeEvent(item: OfflineQueueItem): Promise<void> {
    if (!item.data || !item.data.event) {
      throw new Error('Invalid real-time event item');
    }

    // Send event to WebSocket server
    // This would integrate with your realtime service
    console.log('Processing offline real-time event:', item.data);
  }

  /**
   * Process sync operation
   */
  private async processSyncOperation(item: OfflineQueueItem): Promise<void> {
    if (!item.data || !item.data.operation) {
      throw new Error('Invalid sync operation item');
    }

    // Handle different sync operations
    switch (item.data.operation) {
      case 'sync_leads':
        await this.syncLeads(item.data.data);
        break;
      case 'sync_campaigns':
        await this.syncCampaigns(item.data.data);
        break;
      case 'sync_agents':
        await this.syncAgents(item.data.data);
        break;
      default:
        throw new Error(`Unknown sync operation: ${item.data.operation}`);
    }
  }

  /**
   * Sync leads data
   */
  private async syncLeads(data: any): Promise<void> {
    // Implementation for syncing leads
    console.log('Syncing leads:', data);
  }

  /**
   * Sync campaigns data
   */
  private async syncCampaigns(data: any): Promise<void> {
    // Implementation for syncing campaigns
    console.log('Syncing campaigns:', data);
  }

  /**
   * Sync agents data
   */
  private async syncAgents(data: any): Promise<void> {
    // Implementation for syncing agents
    console.log('Syncing agents:', data);
  }

  /**
   * Start periodic sync timer
   */
  private startSyncTimer() {
    this.syncTimer = setInterval(() => {
      if (this.isOnline && this.queue.length > 0) {
        this.processQueue();
      }
    }, 30000); // Every 30 seconds
  }

  /**
   * Get current sync status
   */
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  /**
   * Add sync status listener
   */
  addSyncStatusListener(listener: (status: SyncStatus) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Force sync now
   */
  async forceSync(): Promise<void> {
    if (!this.isOnline) {
      throw new Error('Cannot sync while offline');
    }

    await this.processQueue();
  }

  /**
   * Clear failed items from queue
   */
  async clearFailedItems(): Promise<void> {
    this.queue = this.queue.filter(item => item.retries < item.maxRetries);
    await this.saveQueue();
    this.updateSyncStatus();
  }

  /**
   * Get queue statistics
   */
  getQueueStats() {
    const stats = {
      total: this.queue.length,
      pending: this.queue.filter(item => item.retries < item.maxRetries).length,
      failed: this.queue.filter(item => item.retries >= item.maxRetries).length,
      byType: {
        api_request: this.queue.filter(item => item.type === 'api_request').length,
        realtime_event: this.queue.filter(item => item.type === 'realtime_event').length,
        sync_operation: this.queue.filter(item => item.type === 'sync_operation').length,
      },
      byPriority: {
        high: this.queue.filter(item => item.priority === 'high').length,
        medium: this.queue.filter(item => item.priority === 'medium').length,
        low: this.queue.filter(item => item.priority === 'low').length,
      },
    };

    return stats;
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
    this.listeners = [];
  }
}

// Create singleton instance
const offlineService = new OfflineService();

export default offlineService;
