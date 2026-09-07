/**
 * React hooks for offline functionality
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import offlineService, { SyncStatus } from '../lib/offline-service';

// Hook for sync status
export function useSyncStatus() {
  const [status, setStatus] = useState<SyncStatus>(offlineService.getSyncStatus());

  useEffect(() => {
    const unsubscribe = offlineService.addSyncStatusListener(setStatus);
    return unsubscribe;
  }, []);

  const forceSync = useCallback(async () => {
    try {
      await offlineService.forceSync();
    } catch (error) {
      console.error('Force sync failed:', error);
      throw error;
    }
  }, []);

  const clearFailedItems = useCallback(async () => {
    await offlineService.clearFailedItems();
  }, []);

  return {
    status,
    forceSync,
    clearFailedItems,
  };
}

// Hook for offline API requests
export function useOfflineApi() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(offlineService.getSyncStatus().online);
    };

    const unsubscribe = offlineService.addSyncStatusListener(updateStatus);
    updateStatus();

    return unsubscribe;
  }, []);

  const makeRequest = useCallback(async (
    endpoint: string,
    method: string,
    data?: any,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (isOnline) {
      try {
        // Try to make the request immediately
        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        // If request fails, queue it for later
        console.log('Request failed, queuing for offline:', error);
        await offlineService.queueRequest(endpoint, method, data, priority);
        throw error;
      }
    } else {
      // Queue request for when online
      await offlineService.queueRequest(endpoint, method, data, priority);
      throw new Error('Request queued for offline sync');
    }
  }, [isOnline]);

  return {
    isOnline,
    makeRequest,
  };
}

// Hook for offline data caching
export function useOfflineCache<T>(
  key: string,
  fetchOnline: () => Promise<T>,
  options: {
    ttl?: number; // Time to live in milliseconds
    priority?: 'low' | 'medium' | 'high';
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const { ttl = 3600000 } = options; // Default 1 hour TTL

  const loadFromCache = useCallback(async () => {
    try {
      const cached = await AsyncStorage.getItem(`cache_${key}`);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        
        // Check if cache is still valid
        if (Date.now() - timestamp < ttl) {
          setData(cachedData);
          setLoading(false);
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to load from cache:', error);
    }
    return false;
  }, [key, ttl]);

  const saveToCache = useCallback(async (dataToCache: T) => {
    try {
      await AsyncStorage.setItem(`cache_${key}`, JSON.stringify({
        data: dataToCache,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to save to cache:', error);
    }
  }, [key]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from cache first
      const fromCache = await loadFromCache();
      if (fromCache) {
        return;
      }

      // Fetch fresh data
      const freshData = await fetchOnline();
      setData(freshData);
      await saveToCache(freshData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchOnline, loadFromCache, saveToCache]);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const freshData = await fetchOnline();
      setData(freshData);
      await saveToCache(freshData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh data');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchOnline, saveToCache]);

  useEffect(() => {
    const updateOfflineStatus = () => {
      setIsOffline(!offlineService.getSyncStatus().online);
    };

    const unsubscribe = offlineService.addSyncStatusListener(updateOfflineStatus);
    updateOfflineStatus();

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    isOffline,
    refresh,
  };
}

// Hook for offline form handling
export function useOfflineForm<T extends Record<string, any>>(
  initialData: T,
  submitFunction: (data: T) => Promise<void>,
  formKey: string
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isQueued, setIsQueued] = useState(false);

  const { status } = useSyncStatus();

  useEffect(() => {
    setIsOffline(!status.online);
  }, [status.online]);

  const saveDraft = useCallback(async () => {
    try {
      await AsyncStorage.setItem(`form_draft_${formKey}`, JSON.stringify({
        data: formData,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to save form draft:', error);
    }
  }, [formData, formKey]);

  const loadDraft = useCallback(async () => {
    try {
      const draft = await AsyncStorage.getItem(`form_draft_${formKey}`);
      if (draft) {
        const { data: draftData } = JSON.parse(draft);
        setFormData(draftData);
        return true;
      }
    } catch (error) {
      console.error('Failed to load form draft:', error);
    }
    return false;
  }, [formKey]);

  const clearDraft = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(`form_draft_${formKey}`);
    } catch (error) {
      console.error('Failed to clear form draft:', error);
    }
  }, [formKey]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setIsQueued(false);

    try {
      if (isOffline) {
        // Queue submission for when online
        await offlineService.queueSyncOperation('form_submit', {
          formKey,
          data: formData,
          timestamp: Date.now(),
        });
        
        setIsQueued(true);
        await saveDraft();
      } else {
        // Submit immediately
        await submitFunction(formData);
        await clearDraft();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isOffline, submitFunction, formKey, saveDraft, clearDraft]);

  const updateField = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialData);
    clearDraft();
  }, [initialData, clearDraft]);

  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  // Auto-save draft on form changes
  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key as keyof T] !== initialData[key as keyof T])) {
      saveDraft();
    }
  }, [formData, initialData, saveDraft]);

  return {
    formData,
    isSubmitting,
    isOffline,
    isQueued,
    updateField,
    submit,
    reset,
    clearDraft,
  };
}

// Hook for offline image/media handling
export function useOfflineMedia() {
  const [uploadQueue, setUploadQueue] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const { status } = useSyncStatus();

  useEffect(() => {
    setIsOnline(status.online);
  }, [status.online]);

  const queueUpload = useCallback(async (mediaData: {
    uri: string;
    type: 'image' | 'video' | 'audio' | 'document';
    name: string;
    metadata?: any;
  }) => {
    const uploadItem = {
      id: crypto.randomUUID(),
      ...mediaData,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 3,
    };

    setUploadQueue(prev => [...prev, uploadItem]);

    // Save to AsyncStorage for persistence
    try {
      const existing = await AsyncStorage.getItem('upload_queue');
      const queue = existing ? JSON.parse(existing) : [];
      queue.push(uploadItem);
      await AsyncStorage.setItem('upload_queue', JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to save upload queue:', error);
    }
  }, []);

  const processUploadQueue = useCallback(async () => {
    if (!isOnline || uploadQueue.length === 0) {
      return;
    }

    const queue = [...uploadQueue];
    const processed: string[] = [];

    for (const item of queue) {
      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', {
          uri: item.uri,
          type: item.type,
          name: item.name,
        } as any);
        
        if (item.metadata) {
          formData.append('metadata', JSON.stringify(item.metadata));
        }

        // Upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status}`);
        }

        processed.push(item.id);
      } catch (error) {
        console.error('Failed to upload media:', error);
        item.retries++;
        
        if (item.retries >= item.maxRetries) {
          processed.push(item.id);
        }
      }
    }

    // Update queue
    const updatedQueue = queue.filter(item => !processed.includes(item.id));
    setUploadQueue(updatedQueue);

    // Save updated queue
    try {
      await AsyncStorage.setItem('upload_queue', JSON.stringify(updatedQueue));
    } catch (error) {
      console.error('Failed to save updated upload queue:', error);
    }
  }, [isOnline, uploadQueue]);

  const clearFailedUploads = useCallback(async () => {
    const updatedQueue = uploadQueue.filter(item => item.retries < item.maxRetries);
    
    setUploadQueue(updatedQueue);
    
    try {
      await AsyncStorage.setItem('upload_queue', JSON.stringify(updatedQueue));
    } catch (error) {
      console.error('Failed to clear failed uploads:', error);
    }
  }, [uploadQueue]);

  useEffect(() => {
    if (isOnline) {
      processUploadQueue();
    }
  }, [isOnline, processUploadQueue]);

  return {
    uploadQueue,
    queueUpload,
    processUploadQueue,
    clearFailedUploads,
    isOnline,
  };
}
