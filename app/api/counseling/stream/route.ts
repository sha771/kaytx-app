import { apiClient } from '@/lib/api-client';

/**
 * SSE endpoint for real-time counseling session updates
 * Streams counseling session events to connected clients
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get('agentId');

  if (!agentId) {
    return new Response('Agent ID required', { status: 400 });
  }

  const encoder = new TextEncoder();
  let isClosed = false;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'connected', agentId })}\n\n`)
      );

      // Send keep-alive pings every 30 seconds
      const pingInterval = setInterval(() => {
        if (isClosed) {
          clearInterval(pingInterval);
          return;
        }
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'ping' })}\n\n`)
          );
        } catch {
          clearInterval(pingInterval);
        }
      }, 30000);

      // Subscribe to counseling events via API client
      const eventSource = apiClient.streamCounselingEvents?.(agentId, (event) => {
        if (isClosed) return;
        
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
          );
        } catch (err) {
          console.error('[Counseling SSE] Failed to send event:', err);
          isClosed = true;
        }
      });

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        isClosed = true;
        clearInterval(pingInterval);
        eventSource?.close?.();
      });
    },
    cancel() {
      isClosed = true;
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
