import { monitoring, MonitoringLevel, measurePerformance } from '../monitoring';

describe('Monitoring Service', () => {
  beforeEach(() => {
    monitoring.clear();
  });

  describe('logging', () => {
    it('should log events at different levels', () => {
      monitoring.debug('test', 'Debug message');
      monitoring.info('test', 'Info message');
      monitoring.warning('test', 'Warning message');
      monitoring.error('test', 'Error message');

      const events = monitoring.getEvents();
      expect(events.length).toBe(4);
    });

    it('should filter events by level', () => {
      monitoring.debug('test', 'Debug');
      monitoring.error('test', 'Error');
      
      const errors = monitoring.getEvents({ level: MonitoringLevel.ERROR });
      expect(errors.length).toBe(1);
      expect(errors[0]!.level).toBe(MonitoringLevel.ERROR);
    });

    it('should filter events by category', () => {
      monitoring.info('auth', 'Login');
      monitoring.info('api', 'API call');
      
      const authEvents = monitoring.getEvents({ category: 'auth' });
      expect(authEvents.length).toBe(1);
      expect(authEvents[0]!.category).toBe('auth');
    });
  });

  describe('error capturing', () => {
    it('should capture errors with stack trace', () => {
      const error = new Error('Test error');
      monitoring.captureError(error, { category: 'test' });

      const events = monitoring.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]!.message).toBe('Test error');
      expect(events[0]!.stackTrace).toBeDefined();
    });
  });

  describe('performance tracking', () => {
    it('should track performance metrics', () => {
      monitoring.trackPerformance('api_call', 150, 'ms');
      monitoring.trackPerformance('api_call', 200, 'ms');

      const metrics = monitoring.getMetrics('api_call');
      expect(metrics.length).toBe(2);
    });

    it('should calculate average metrics', () => {
      monitoring.trackPerformance('api_call', 100, 'ms');
      monitoring.trackPerformance('api_call', 200, 'ms');
      monitoring.trackPerformance('api_call', 300, 'ms');

      const avg = monitoring.getAverageMetric('api_call');
      expect(avg).toBe(200);
    });

    it('should measure function performance', () => {
      const result = measurePerformance('test_function', () => {
        return 42;
      });

      expect(result).toBe(42);
      const metrics = monitoring.getMetrics('test_function');
      expect(metrics.length).toBe(1);
    });
  });

  describe('health status', () => {
    it('should report healthy status', () => {
      monitoring.info('test', 'Normal operation');
      
      const health = monitoring.getHealthStatus();
      expect(health.status).toBe('healthy');
    });

    it('should report degraded status with warnings', () => {
      for (let i = 0; i < 25; i++) {
        monitoring.warning('test', 'Warning');
      }
      
      const health = monitoring.getHealthStatus();
      expect(health.status).toBe('degraded');
    });

    it('should report critical status with errors', () => {
      for (let i = 0; i < 15; i++) {
        monitoring.error('test', 'Error');
      }
      
      const health = monitoring.getHealthStatus();
      expect(health.status).toBe('critical');
    });
  });
});
