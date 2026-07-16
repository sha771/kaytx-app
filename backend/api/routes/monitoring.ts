import { Hono } from 'hono';
import { MonitoringDashboard } from '../../monitoring/dashboard';
import { metricsCollector } from '../../monitoring/metrics-collector';
import { alertManager } from '../../monitoring/alerts';
import { protectWithRBAC } from '../../middleware/route-protection';
import { requireAuth } from '../../middleware/rbac-middleware';
import { validateInput , validationSchemas } from '../../middleware/comprehensive-validation';
import type { RouteContext } from './route-types';

const monitoring = new Hono<{ Variables: RouteContext['env']['Variables'] }>();

type AppContext = RouteContext;

// Apply authentication to all monitoring routes
monitoring.use('*', requireAuth());

// Dashboard endpoint
monitoring.get('/dashboard', async (c: AppContext) => {
  try {
    const dashboardData = await MonitoringDashboard.getDashboardData();
    return c.json(dashboardData);
  } catch (error) {
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

// Metrics data endpoint
monitoring.get('/metrics', validateInput(validationSchemas.metricsQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as { timeRange?: string };
    const timeRange = query.timeRange || '1h';
    
    const metricsData = await MonitoringDashboard.getMetricsData(timeRange);
    return c.json(metricsData);
  } catch (error) {
    return c.json({ error: 'Failed to fetch metrics data' }, 500);
  }
});

// Alert history endpoint
monitoring.get('/alerts', validateInput(validationSchemas.alertQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as {
      severity?: string;
      resolved?: boolean;
      limit?: number;
      offset?: number;
    };
    
    const alertHistory = await MonitoringDashboard.getAlertHistory(query);
    return c.json(alertHistory);
  } catch (error) {
    return c.json({ error: 'Failed to fetch alert history' }, 500);
  }
});

// Performance data endpoint
monitoring.get('/performance', async (c: AppContext) => {
  try {
    const performanceData = await MonitoringDashboard.getPerformanceData();
    return c.json(performanceData);
  } catch (error) {
    return c.json({ error: 'Failed to fetch performance data' }, 500);
  }
});

// Top endpoints endpoint
monitoring.get('/endpoints', validateInput(validationSchemas.endpointQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as { limit?: number };
    const limit = query.limit || 10;
    
    const topEndpoints = await MonitoringDashboard.getTopEndpoints(limit);
    return c.json(topEndpoints);
  } catch (error) {
    return c.json({ error: 'Failed to fetch endpoint data' }, 500);
  }
});

// Security metrics endpoint
monitoring.get('/security', async (c: AppContext) => {
  try {
    const securityMetrics = await MonitoringDashboard.getSecurityMetrics();
    return c.json(securityMetrics);
  } catch (error) {
    return c.json({ error: 'Failed to fetch security metrics' }, 500);
  }
});

// Health check endpoint (enhanced)
monitoring.get('/health', async (c: AppContext) => {
  try {
    const healthStatus = metricsCollector.getHealthStatus();
    return c.json(healthStatus);
  } catch (error) {
    return c.json({ 
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: Date.now()
    }, 500);
  }
});

// Prometheus metrics endpoint
monitoring.get('/prometheus', async (c: AppContext) => {
  try {
    const prometheusMetrics = metricsCollector.exportPrometheusMetrics();
    c.header('Content-Type', 'text/plain; version=0.0.4');
    return c.text(prometheusMetrics);
  } catch (error) {
    return c.text('# Error generating metrics\n', 500);
  }
});

// HTML dashboard endpoint
monitoring.get('/dashboard/html', async (c: AppContext) => {
  try {
    const html = MonitoringDashboard.generateDashboardHTML();
    c.header('Content-Type', 'text/html');
    return c.html(html);
  } catch (error) {
    return c.text('<h1>Dashboard unavailable</h1>', 500);
  }
});

// Alert management endpoints (admin only)
monitoring.post('/alerts/test', protectWithRBAC, async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const { ruleId, testMetrics } = body;
    
    if (!ruleId || !testMetrics) {
      return c.json({ error: 'ruleId and testMetrics are required' }, 400);
    }
    
    const result = await alertManager.testRule(ruleId, testMetrics);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to test alert rule' }, 500);
  }
});

monitoring.put('/alerts/:ruleId/toggle', protectWithRBAC, async (c: AppContext) => {
  try {
    const ruleId = c.req.param('ruleId');
    const body = await c.req.json();
    const { enabled } = body;
    
    if (typeof enabled !== 'boolean') {
      return c.json({ error: 'enabled must be a boolean' }, 400);
    }
    
    alertManager.toggleRule(ruleId, enabled);
    return c.json({ success: true, ruleId, enabled });
  } catch (error) {
    return c.json({ error: 'Failed to toggle alert rule' }, 500);
  }
});

monitoring.delete('/alerts/:ruleId', protectWithRBAC, async (c: AppContext) => {
  try {
    const ruleId = c.req.param('ruleId');
    alertManager.removeRule(ruleId);
    return c.json({ success: true, ruleId });
  } catch (error) {
    return c.json({ error: 'Failed to remove alert rule' }, 500);
  }
});

// Custom alert rule creation (admin only)
monitoring.post('/alerts/rules', protectWithRBAC, async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const rule = body;
    
    // Validate rule structure
    if (!rule.id || !rule.name || !rule.condition) {
      return c.json({ 
        error: 'Rule must have id, name, and condition' 
      }, 400);
    }
    
    alertManager.addRule(rule);
    return c.json({ success: true, rule });
  } catch (error) {
    return c.json({ error: 'Failed to create alert rule' }, 500);
  }
});

export default monitoring;
