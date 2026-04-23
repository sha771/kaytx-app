import { paymentWebhookService } from '../../../../services/payment-webhook-service';

export async function POST(request: Request) {
  try {
    const result = await paymentWebhookService.processWebhook(request as any);
    
    if (result.success) {
      return new Response('Webhook processed successfully', { status: 200 });
    } else {
      return new Response(result.message, { status: 400 });
    }
  } catch (error) {
    console.error('[Webhook] Unexpected error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
