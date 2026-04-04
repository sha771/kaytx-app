import { realtimeCallingService, CallChannel } from './realtimeCallingService';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'verified' | 'cancelled' | 'failed';
  createdAt: Date;
  verifiedAt?: Date;
  callAttempts: number;
  maxRetries: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface VerificationConfig {
  enabled: boolean;
  timing: 'immediate' | 'delayed';
  delayMinutes: number;
  maxRetries: number;
  retryInterval: number;
  preferredChannel: CallChannel;
  fallbackChannels: CallChannel[];
}

export interface VerificationResult {
  orderId: string;
  success: boolean;
  verifiedAt: Date;
  attempts: number;
  channel: CallChannel;
  customerResponse?: 'confirmed' | 'cancelled' | 'no-answer';
}

class OrderVerificationService {
  private pendingOrders: Map<string, Order> = new Map();
  private verificationConfig: VerificationConfig = {
    enabled: true,
    timing: 'immediate',
    delayMinutes: 0,
    maxRetries: 2,
    retryInterval: 5,
    preferredChannel: 'voice',
    fallbackChannels: ['whatsapp', 'sms'],
  };
  private orderListeners: Set<(orders: Order[]) => void> = new Set();
  private verificationListeners: Set<(result: VerificationResult) => void> = new Set();

  constructor() {
    console.log('[OrderVerificationService] initialized');
  }

  setVerificationConfig(config: Partial<VerificationConfig>) {
    this.verificationConfig = { ...this.verificationConfig, ...config };
    console.log('[OrderVerificationService] config updated', this.verificationConfig);
  }

  getVerificationConfig(): VerificationConfig {
    return { ...this.verificationConfig };
  }

  async createOrder(
    customerName: string,
    customerPhone: string,
    items: OrderItem[],
    totalAmount: number
  ): Promise<string> {
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const order: Order = {
      id: orderId,
      customerName,
      customerPhone,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date(),
      callAttempts: 0,
      maxRetries: this.verificationConfig.maxRetries,
    };

    this.pendingOrders.set(orderId, order);
    console.log('[OrderVerificationService] order created', { orderId, customerName, totalAmount });
    
    this.notifyOrderListeners();

    if (this.verificationConfig.enabled) {
      if (this.verificationConfig.timing === 'immediate') {
        this.scheduleVerificationCall(orderId, 0);
      } else {
        this.scheduleVerificationCall(orderId, this.verificationConfig.delayMinutes * 60 * 1000);
      }
    }

    return orderId;
  }

  private scheduleVerificationCall(orderId: string, delayMs: number) {
    setTimeout(() => {
      this.initiateVerificationCall(orderId);
    }, delayMs);
  }

  private async initiateVerificationCall(orderId: string) {
    const order = this.pendingOrders.get(orderId);
    if (!order) {
      console.log('[OrderVerificationService] order not found', orderId);
      return;
    }

    if (order.status !== 'pending') {
      console.log('[OrderVerificationService] order already processed', orderId);
      return;
    }

    order.callAttempts++;
    console.log('[OrderVerificationService] initiating verification call', {
      orderId,
      attempt: order.callAttempts,
      maxRetries: order.maxRetries,
    });

    const channel = order.callAttempts === 1 
      ? this.verificationConfig.preferredChannel 
      : this.verificationConfig.fallbackChannels[order.callAttempts - 2] || 'voice';

    const callId = realtimeCallingService.initiateCall(
      order.customerPhone,
      order.customerName,
      channel
    );

    console.log('[OrderVerificationService] verification call initiated', { orderId, callId, channel });

    setTimeout(() => {
      this.simulateVerificationResponse(orderId, callId, channel);
    }, 8000 + Math.random() * 7000);

    this.notifyOrderListeners();
  }

  private simulateVerificationResponse(orderId: string, callId: string, channel: CallChannel) {
    const order = this.pendingOrders.get(orderId);
    if (!order) return;

    const responses: ('confirmed' | 'cancelled' | 'no-answer')[] = ['confirmed', 'confirmed', 'confirmed', 'no-answer', 'cancelled'];
    const customerResponse = responses[Math.floor(Math.random() * responses.length)];

    console.log('[OrderVerificationService] customer response', { orderId, customerResponse });

    if (customerResponse === 'confirmed') {
      order.status = 'verified';
      order.verifiedAt = new Date();
      
      const result: VerificationResult = {
        orderId,
        success: true,
        verifiedAt: new Date(),
        attempts: order.callAttempts,
        channel,
        customerResponse,
      };

      this.notifyVerificationListeners(result);
      console.log('[OrderVerificationService] order verified', orderId);
      
    } else if (customerResponse === 'cancelled') {
      order.status = 'cancelled';
      
      const result: VerificationResult = {
        orderId,
        success: false,
        verifiedAt: new Date(),
        attempts: order.callAttempts,
        channel,
        customerResponse,
      };

      this.notifyVerificationListeners(result);
      console.log('[OrderVerificationService] order cancelled by customer', orderId);
      
    } else if (customerResponse === 'no-answer') {
      if (order.callAttempts < order.maxRetries) {
        console.log('[OrderVerificationService] no answer, scheduling retry', orderId);
        this.scheduleVerificationCall(orderId, this.verificationConfig.retryInterval * 60 * 1000);
      } else {
        order.status = 'failed';
        
        const result: VerificationResult = {
          orderId,
          success: false,
          verifiedAt: new Date(),
          attempts: order.callAttempts,
          channel,
          customerResponse,
        };

        this.notifyVerificationListeners(result);
        console.log('[OrderVerificationService] max retries reached', orderId);
      }
    }

    this.notifyOrderListeners();
  }

  getOrder(orderId: string): Order | undefined {
    return this.pendingOrders.get(orderId);
  }

  getAllOrders(): Order[] {
    return Array.from(this.pendingOrders.values());
  }

  getPendingOrders(): Order[] {
    return this.getAllOrders().filter(o => o.status === 'pending');
  }

  getVerifiedOrders(): Order[] {
    return this.getAllOrders().filter(o => o.status === 'verified');
  }

  subscribeToOrders(listener: (orders: Order[]) => void) {
    this.orderListeners.add(listener);
    listener(this.getAllOrders());
    
    return () => {
      this.orderListeners.delete(listener);
    };
  }

  subscribeToVerifications(listener: (result: VerificationResult) => void) {
    this.verificationListeners.add(listener);
    
    return () => {
      this.verificationListeners.delete(listener);
    };
  }

  private notifyOrderListeners() {
    const orders = this.getAllOrders();
    this.orderListeners.forEach(listener => listener(orders));
  }

  private notifyVerificationListeners(result: VerificationResult) {
    this.verificationListeners.forEach(listener => listener(result));
  }

  manualVerify(orderId: string) {
    const order = this.pendingOrders.get(orderId);
    if (!order) return;

    order.status = 'verified';
    order.verifiedAt = new Date();
    
    const result: VerificationResult = {
      orderId,
      success: true,
      verifiedAt: new Date(),
      attempts: order.callAttempts,
      channel: 'voice',
      customerResponse: 'confirmed',
    };

    this.notifyVerificationListeners(result);
    this.notifyOrderListeners();
    
    console.log('[OrderVerificationService] order manually verified', orderId);
  }

  cancelOrder(orderId: string) {
    const order = this.pendingOrders.get(orderId);
    if (!order) return;

    order.status = 'cancelled';
    this.notifyOrderListeners();
    
    console.log('[OrderVerificationService] order cancelled', orderId);
  }
}

export const orderVerificationService = new OrderVerificationService();
