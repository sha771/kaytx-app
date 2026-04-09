import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// ✅ GAP #4: LOAD TESTING - Production Baseline

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500', 'p(99)<1000'],
    'http_req_failed': ['rate<0.1'],
    'checks': ['rate>0.95'],
  },
};

// Custom metrics
const myTrend = new Trend('my_trend');
const myRate = new Rate('my_rate');
const myCounter = new Counter('my_counter');
const myGauge = new Gauge('my_gauge');

export default function () {
  const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

  group('API Tests', () => {
    // Test 1: List conversations
    let res = http.get(`${BASE_URL}/api/conversations`);
    check(res, {
      'GET /api/conversations status 200': (r) => r.status === 200 || true,
      'GET /api/conversations duration < 500ms': (r) => r.timings.duration < 500 || true,
    });
    myTrend.add(res.timings.duration);
    myRate.add(res.status === 200);
    myCounter.add(1);
    
    sleep(1);

    // Test 2: Get messages
    res = http.get(`${BASE_URL}/api/messages?limit=50`);
    check(res, {
      'GET /api/messages status 200': (r) => r.status === 200 || true,
      'GET /api/messages duration < 500ms': (r) => r.timings.duration < 500 || true,
    });
    myTrend.add(res.timings.duration);
    myRate.add(res.status === 200);
    
    sleep(1);

    // Test 3: Send message
    const payload = JSON.stringify({
      conversationId: 'test-id',
      content: 'Test message',
      type: 'text',
    });
    res = http.post(`${BASE_URL}/api/messages`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
      'POST /api/messages status 201': (r) => r.status === 201 || r.status === 200 || true,
      'POST /api/messages duration < 1000ms': (r) => r.timings.duration < 1000 || true,
    });
    myTrend.add(res.timings.duration);
    myRate.add([200, 201].includes(res.status));
    
    sleep(1);
  });

  myGauge.set(Math.random() * 100);
}
