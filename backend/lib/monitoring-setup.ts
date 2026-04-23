import { Hono } from 'hono';
import { alertManager } from './alerting';
import { setupMonitoring } from './monitoring';
import { AIServiceLogger } from './ai-service-logger';
import { logger } from './production-logger';

export function setupComprehensiveMonitoring(app: Hono) {
  // Setup existing monitoring endpoints
  setupMonitoring(app);

  // Add alerting endpoints
  app.get('/alerts', async (c) => {
    try {
      const activeAlerts = alertManager.getActiveAlerts();
      return c.json({
        timestamp: Date.now(),
        activeAlerts: activeAlerts.length,
        alerts: activeAlerts
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.get('/alerts/history', async (c) => {
    try {
      const limit = parseInt(c.req.query('limit') || '100');
      const history = alertManager.getAlertHistory(limit);
      return c.json({
        timestamp: Date.now(),
        total: history.length,
        alerts: history
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.get('/alerts/rules', async (c) => {
    try {
      const rules = alertManager.getRules();
      return c.json({
        timestamp: Date.now(),
        total: rules.length,
        rules: rules
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.get('/alerts/rules/:ruleId', async (c) => {
    try {
      const ruleId = c.req.param('ruleId');
      const rule = alertManager.getRule(ruleId);
      const state = alertManager.getRuleState(ruleId);
      
      if (!rule) {
        return c.json({ error: 'Rule not found' }, 404);
      }

      return c.json({
        rule,
        state
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/alerts/rules/:ruleId/test', async (c) => {
    try {
      const ruleId = c.req.param('ruleId');
      const result = await alertManager.testRule(ruleId);
      
      return c.json({
        ruleId,
        triggered: result,
        timestamp: Date.now()
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/alerts/rules/:ruleId/enable', async (c) => {
    try {
      const ruleId = c.req.param('ruleId');
      alertManager.enableRule(ruleId);
      
      return c.json({
        ruleId,
        enabled: true,
        timestamp: Date.now()
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/alerts/rules/:ruleId/disable', async (c) => {
    try {
      const ruleId = c.req.param('ruleId');
      alertManager.disableRule(ruleId);
      
      return c.json({
        ruleId,
        enabled: false,
        timestamp: Date.now()
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.get('/alerts/metrics', async (c) => {
    try {
      const metrics = alertManager.getMetrics();
      return c.json({
        timestamp: Date.now(),
        metrics
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  // AI Service Logger endpoints
  app.get('/logs/ai-service', async (c) => {
    try {
      const limit = parseInt(c.req.query('limit') || '100');
      const agentType = c.req.query('agentType');
      const correlationId = c.req.query('correlationId');
      const search = c.req.query('search');

      const logs = await AIServiceLogger.queryLogs({
        limit,
        agentType,
        correlationId,
        search
      });

      return c.json({
        timestamp: Date.now(),
        total: logs.length,
        logs
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/logs/ai-service/flush', async (c) => {
    try {
      await AIServiceLogger.flush();
      return c.json({
        timestamp: Date.now(),
        message: 'AI service logs flushed successfully'
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.get('/logs/ai-service/stats', async (c) => {
    try {
      const stats = AIServiceLogger.getStats();
      return c.json({
        timestamp: Date.now(),
        stats
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  // Initialize alert manager
  alertManager.initialize().catch(error => {
    logger.error('Failed to initialize alert manager', error instanceof Error ? error : undefined);
  });

  // Setup graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('Shutting down monitoring systems...');
    await alertManager.shutdown();
    await AIServiceLogger.flush();
  });

  process.on('SIGINT', async () => {
    logger.info('Shutting down monitoring systems...');
    await alertManager.shutdown();
    await AIServiceLogger.flush();
  });
}

export default setupComprehensiveMonitoring;
