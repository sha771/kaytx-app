import { Hono } from 'hono';
import { requireAuth } from '../../middleware/rbac-middleware';
import { protectWithRBAC } from '../../middleware/route-protection';
import { validateInput, validationSchemas } from '../../middleware/comprehensive-validation';
import type { RouteContext } from './route-types';

// Import existing services
import { emailCampaignService } from '../../services/email-campaign-service';
import { leadManagementService } from '../../services/lead-management-service';
import { aiAgentService } from '../../services/ai-agent-service';
import { consolidatedPlatformSyncService as platformSyncEngine } from '../../services/consolidated-platform-sync-service';
import { stripeService } from '../../services/stripe-service';
import { gdprService } from '../../services/gdpr-service';
import { unifiedMultiAgentCoordinator as multiAgentCoordinator } from '../../services/unified-multi-agent-coordinator';
import { analyticsService } from '../../services/consolidated-analytics-service';
import { paymentMethodService } from '../../services/payment-method-service';
import { invoiceGenerationService } from '../../services/invoice-generation-service';

import {
  initiateAgentConsultation,
  initiateMainToSubagentCounseling,
  initiateSubagentToMainCounseling,
  initiatePeerToPeerCounseling,
  respondToAgentConsultation,
  getConsultationSession,
  getActiveConsultations,
  getConsultationHistory,
} from '../../services/agent-consulting-service';

import { AIServiceManager, createAIMessage } from '../../services/ai/ai-model-abstraction';

const services = new Hono<{ Variables: RouteContext['env']['Variables'] }>();

type AppContext = RouteContext;

// Apply authentication to all service routes
services.use('*', requireAuth());

const validateBody = (schema: any) => validateInput(schema, 'body');
const validateQuery = (schema: any) => validateInput(schema, 'query');
const validateParams = (schema: any) => validateInput(schema, 'params');

// Email Campaign Service Routes
services.post('/email-campaigns', validateBody(validationSchemas.emailCampaignCreate), async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const campaign = await emailCampaignService.createCampaign(auth.organizationId, body);
    
    return c.json({ success: true, data: campaign });
  } catch (error) {
    return c.json({ error: 'Failed to create email campaign' }, 500);
  }
});

services.get('/email-campaigns', validateQuery(validationSchemas.campaignQuery), async (c: AppContext) => {
  try {
    const query = (c as any).get('validatedQuery') as any;
    const auth = (c as any).get('auth') as any;
    
    const campaigns = await emailCampaignService.getCampaigns(auth.organizationId, query?.status);
    
    return c.json({ success: true, data: campaigns });
  } catch (error) {
    return c.json({ error: 'Failed to fetch email campaigns' }, 500);
  }
});

services.post('/email-campaigns/:id/send', validateParams(validationSchemas.uuidParam), async (c: AppContext) => {
  try {
    const params = (c as any).get('validatedParams') as any;
    const auth = (c as any).get('auth') as any;
    
    const result = await emailCampaignService.launchCampaign(auth.organizationId, params.id);
    
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: 'Failed to send email campaign' }, 500);
  }
});

// Lead Management Service Routes
services.post('/leads', validateBody(validationSchemas.leadCreate), async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const lead = await leadManagementService.createLead(auth.organizationId, {
      ...body,
      createdBy: auth.userId,
    });
    
    return c.json({ success: true, data: lead });
  } catch (error) {
    return c.json({ error: 'Failed to create lead' }, 500);
  }
});

services.get('/leads', validateQuery(validationSchemas.leadQuery), async (c: AppContext) => {
  try {
    const query = (c as any).get('validatedQuery') as any;
    const auth = (c as any).get('auth') as any;
    
    const leads = await leadManagementService.getLeads(auth.organizationId, query);
    
    return c.json({ success: true, data: leads });
  } catch (error) {
    return c.json({ error: 'Failed to fetch leads' }, 500);
  }
});

services.put('/leads/:id', validateParams(validationSchemas.uuidParam), validateBody(validationSchemas.leadUpdate), async (c: AppContext) => {
  try {
    const params = (c as any).get('validatedParams') as any;
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const lead = await leadManagementService.updateLead(auth.organizationId, params.id, {
      ...body,
      updatedBy: auth.userId,
    });
    
    return c.json({ success: true, data: lead });
  } catch (error) {
    return c.json({ error: 'Failed to update lead' }, 500);
  }
});

// AI Agent Service Routes
services.post('/ai-agents', validateBody(validationSchemas.aiAgentCreate), protectWithRBAC, async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const agent = await aiAgentService.createAgent(body, auth.organizationId, auth.userId);
    
    return c.json({ success: true, data: agent });
  } catch (error) {
    return c.json({ error: 'Failed to create AI agent' }, 500);
  }
});

services.get('/ai-agents', validateQuery(validationSchemas.agentQuery), async (c: AppContext) => {
  try {
    const query = (c as any).get('validatedQuery') as any;
    const auth = (c as any).get('auth') as any;
    
    const agents = await aiAgentService.getAgents(auth.organizationId, query);
    
    return c.json({ success: true, data: agents });
  } catch (error) {
    return c.json({ error: 'Failed to fetch AI agents' }, 500);
  }
});

services.post('/ai-agents/:id/chat', validateParams(validationSchemas.uuidParam), validateBody(validationSchemas.agentChat), async (c: AppContext) => {
  try {
    const params = (c as any).get('validatedParams') as any;
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const response = await aiAgentService.chat(
      params.id,
      body.message,
      body.context
    );
    
    return c.json({ success: true, data: response });
  } catch (error) {
    return c.json({ error: 'Failed to process AI agent chat' }, 500);
  }
});

// Platform Sync Engine Routes - commented out due to API mismatch
/*
services.post('/platform-sync/connections', validateBody(validationSchemas.platformConnection), protectWithRBAC, async (c: AppContext) => {
  try {
    const body = (c as any).get('validatedBody') as any;
    const auth = (c as any).get('auth') as any;
    
    const connection = await platformSyncEngine.createConnection({
      ...body,
      organizationId: auth.organizationId,
      createdBy: auth.userId,
    });
    
    return c.json({ success: true, data: connection });
  } catch (error) {
    return c.json({ error: 'Failed to create platform connection' }, 500);
  }
});

services.get('/platform-sync/connections', validateQuery(validationSchemas.connectionQuery), async (c: AppContext) => {
  try {
    const query = (c as any).get('validatedQuery') as any;
    const auth = (c as any).get('auth') as any;
    
    const connections = await platformSyncEngine.getConnections({
      organizationId: auth.organizationId,
      ...query,
    });
    
    return c.json({ success: true, data: connections });
  } catch (error) {
    return c.json({ error: 'Failed to fetch platform connections' }, 500);
  }
});

services.post('/platform-sync/connections/:id/sync', validateParams(validationSchemas.uuidParam), async (c: AppContext) => {
  try {
    const params = (c as any).get('validatedParams') as any;
    const auth = (c as any).get('auth') as any;
    
    const result = await platformSyncEngine.syncConnection({
      connectionId: params.id,
      organizationId: auth.organizationId,
      triggeredBy: auth.userId,
    });
    
    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ error: 'Failed to sync platform connection' }, 500);
  }
});
*/

// Payment Service Routes
services.post('/payments/intents', validateBody(validationSchemas.paymentIntent), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody');
    const auth = c.get('auth');
    
    const paymentIntent = await stripeService.createPaymentIntent({
      customerId: body.customerId,
      organizationId: auth.organizationId,
      amount: body.amount,
      currency: body.currency,
      metadata: body.metadata,
    });
    
    return c.json({ success: true, data: paymentIntent });
  } catch (error) {
    return c.json({ error: 'Failed to create payment intent' }, 500);
  }
});

services.post('/payments/confirm', validateBody(validationSchemas.paymentConfirm), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody');
    const auth = c.get('auth');
    
    const payment = await stripeService.confirmPayment(
      body.paymentIntentId,
      auth.organizationId
    );
    
    return c.json({ success: true, data: payment });
  } catch (error) {
    return c.json({ error: 'Failed to confirm payment' }, 500);
  }
});

services.get('/payments/methods', validateQuery(validationSchemas.paymentMethodQuery), async (c: AppContext) => {
  try {
    const auth = c.get('auth');
    
    const paymentMethods = await paymentMethodService.getPaymentMethods(auth.organizationId);
    
    return c.json({ success: true, data: paymentMethods });
  } catch (error) {
    return c.json({ error: 'Failed to fetch payment methods' }, 500);
  }
});

// Invoice Service Routes
services.post('/invoices', validateBody(validationSchemas.invoiceCreate), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody');
    const auth = c.get('auth');
    
    const invoice = await invoiceGenerationService.createInvoice({
      ...body,
      organizationId: auth.organizationId,
      createdBy: auth.userId,
    });
    
    return c.json({ success: true, data: invoice });
  } catch (error) {
    return c.json({ error: 'Failed to create invoice' }, 500);
  }
});

// TODO: getInvoices method doesn't exist on service, using getInvoice instead
/*
services.get('/invoices', validateQuery(validationSchemas.invoiceQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery');
    const auth = c.get('auth');
    
    const invoices = await invoiceGenerationService.getInvoices({
      organizationId: auth.organizationId,
      ...query,
    });
    
    return c.json({ success: true, data: invoices });
  } catch (error) {
    return c.json({ error: 'Failed to fetch invoices' }, 500);
  }
});
*/

// GDPR Service Routes
services.post('/gdpr/data-request', validateBody(validationSchemas.gdprRequest), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody');
    const auth = c.get('auth');
    
    const request = await gdprService.createGDPRRequest({
      ...body,
      organizationId: auth.organizationId,
      requestedBy: auth.userId,
    });
    
    return c.json({ success: true, data: request });
  } catch (error) {
    return c.json({ error: 'Failed to create GDPR data request' }, 500);
  }
});

// TODO: getDataRequests method doesn't exist on service
/*
services.get('/gdpr/data-requests', validateQuery(validationSchemas.gdprQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery');
    const auth = c.get('auth');
    
    const requests = await gdprService.getDataRequests({
      organizationId: auth.organizationId,
      ...query,
    });
    
    return c.json({ success: true, data: requests });
  } catch (error) {
    return c.json({ error: 'Failed to fetch GDPR data requests' }, 500);
  }
});
*/

// Analytics Service Routes
services.get('/analytics/dashboard', validateQuery(validationSchemas.analyticsQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery');
    const auth = c.get('auth');
    
    const analytics = await analyticsService.getDashboardAnalytics({
      organizationId: auth.organizationId,
      ...query,
    });
    
    return c.json({ success: true, data: analytics });
  } catch (error) {
    return c.json({ error: 'Failed to fetch analytics data' }, 500);
  }
});

services.get('/analytics/reports/:id', validateParams(validationSchemas.uuidParam), async (c: AppContext) => {
  try {
    const params = c.get('validatedParams');
    const auth = c.get('auth');
    
    const report = await analyticsService.getReport(params.id);
    
    return c.json({ success: true, data: report });
  } catch (error) {
    return c.json({ error: 'Failed to fetch analytics report' }, 500);
  }
});

// Multi-Agent Coordinator Routes
services.post('/multi-agent/tasks', validateBody(validationSchemas.multiAgentTaskCreate), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody');
    const auth = c.get('auth');
    
    const task = await multiAgentCoordinator.createTask({
      ...body,
      coordinatorId: auth.userId,
    });
    
    return c.json({ success: true, data: task });
  } catch (error) {
    return c.json({ error: 'Failed to create multi-agent task' }, 500);
  }
});

// TODO: getTaskStatus method doesn't exist on service, using createTask instead
/*
services.get('/multi-agent/status/:taskId', validateParams(validationSchemas.uuidParam), async (c: AppContext) => {
  try {
    const params = c.get('validatedParams');
    const auth = c.get('auth');
    
    const status = await multiAgentCoordinator.getTaskStatus({
      taskId: params.taskId,
      organizationId: auth.organizationId,
    });
    
    return c.json({ success: true, data: status });
  } catch (error) {
    return c.json({ error: 'Failed to fetch task status' }, 500);
  }
});
*/

// Agent-to-Agent Counseling Routes
services.post('/agent-counseling/main-to-sub', validateBody(validationSchemas.agentCounselingMainToSub), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const session = await initiateMainToSubagentCounseling(
      body.mainAgentId,
      body.subagentId,
      body.counselingType,
      body.topic,
      body.details,
      body.options ? {
        ...body.options,
        ...(body.options.deadline ? { deadline: new Date(body.options.deadline) } : {}),
      } : undefined
    );
    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to initiate main-to-sub counseling' }, 500);
  }
});

services.post('/agent-counseling/sub-to-main', validateBody(validationSchemas.agentCounselingSubToMain), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const session = await initiateSubagentToMainCounseling(
      body.subagentId,
      body.mainAgentId,
      body.requestType,
      body.topic,
      body.details,
      body.options ? {
        ...body.options,
        ...(body.options.deadline ? { deadline: new Date(body.options.deadline) } : {}),
      } : undefined
    );
    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to initiate sub-to-main counseling' }, 500);
  }
});

services.post('/agent-counseling/peer', validateBody(validationSchemas.agentCounselingPeer), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const session = await initiatePeerToPeerCounseling(
      body.agentId1,
      body.agentId2,
      body.counselingType,
      body.topic,
      body.details,
      body.options ? {
        ...body.options,
        ...(body.options.deadline ? { deadline: new Date(body.options.deadline) } : {}),
      } : undefined
    );
    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to initiate peer counseling' }, 500);
  }
});

services.post('/agent-counseling/sessions/:id/respond', validateParams(validationSchemas.uuidParam), validateBody(validationSchemas.agentCounselingRespond), async (c: AppContext) => {
  try {
    const params = c.get('validatedParams') as any;
    const body = c.get('validatedBody') as any;
    const response = body.response;

    if (response?.actionItems?.length) {
      response.actionItems = response.actionItems.map((a: any) => ({
        ...a,
        ...(a.dueDate ? { dueDate: new Date(a.dueDate) } : {}),
      }));
    }

    const session = await respondToAgentConsultation(params.id, body.respondingAgentId, response);
    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to respond to counseling session' }, 500);
  }
});

services.post(
  '/agent-counseling/sessions/:id/auto-respond',
  validateParams(validationSchemas.uuidParam),
  validateBody(validationSchemas.agentCounselingAutoRespond),
  async (c: AppContext) => {
    try {
      const params = c.get('validatedParams') as any;
      const body = c.get('validatedBody') as any;

      const session = getConsultationSession(params.id);
      if (!session) {
        return c.json({ error: 'Counseling session not found' }, 404);
      }

      const lastRequest = session.requests[session.requests.length - 1];
      const defaultResponderId = session.participants[0]?.agentId;
      const respondingAgentId = body.respondingAgentId || defaultResponderId;
      if (!respondingAgentId) {
        return c.json({ error: 'No responding agent available for this session' }, 400);
      }

      const provider = (body.provider as ('openai' | 'google') | undefined) || (process.env.AI_PROVIDER as any) || 'google';
      const model = body.model || (provider === 'google' ? (process.env.GOOGLE_MODEL || 'gemini-1.5-pro') : (process.env.OPENAI_MODEL || 'gpt-4o-mini'));

      const ai = new AIServiceManager({
        provider,
        model,
        temperature: body.temperature,
        maxTokens: body.maxTokens,
      });

      const systemPrompt =
        'You are an AI counselor. Return ONLY valid JSON with keys: ' +
        'answer (string), recommendations (string[]), confidence (number 0-1), reasoning (string), caveats (string[]), requiresFollowUp (boolean), suggestedNextSteps (string[]).';

      const userPrompt =
        `Topic: ${lastRequest.topic}\n` +
        `Question: ${lastRequest.question}\n` +
        `Context: ${JSON.stringify(lastRequest.context || {})}`;

      const aiResp = await ai.chat([
        createAIMessage('system', systemPrompt),
        createAIMessage('user', userPrompt),
      ]);

      let parsed: any = null;
      try {
        parsed = JSON.parse(aiResp.content);
      } catch {
        parsed = null;
      }

      const responsePayload = {
        status: body.status || 'completed',
        answer: (parsed?.answer && String(parsed.answer).trim().length > 0) ? String(parsed.answer) : aiResp.content,
        recommendations: Array.isArray(parsed?.recommendations) ? parsed.recommendations.map((r: any) => String(r)) : [],
        confidence: typeof parsed?.confidence === 'number' ? parsed.confidence : 0.6,
        reasoning: typeof parsed?.reasoning === 'string' ? parsed.reasoning : 'Generated by AI counselor',
        caveats: Array.isArray(parsed?.caveats) ? parsed.caveats.map((c: any) => String(c)) : [],
        requiresFollowUp: typeof parsed?.requiresFollowUp === 'boolean' ? parsed.requiresFollowUp : false,
        suggestedNextSteps: Array.isArray(parsed?.suggestedNextSteps) ? parsed.suggestedNextSteps.map((s: any) => String(s)) : [],
      };

      const updated = await respondToAgentConsultation(params.id, respondingAgentId, responsePayload);
      return c.json({ success: true, data: updated });
    } catch (error) {
      return c.json({ error: 'Failed to auto-respond to counseling session' }, 500);
    }
  }
);

services.get('/agent-counseling/sessions', validateQuery(validationSchemas.agentCounselingSessionsQuery), async (c: AppContext) => {
  try {
    const query = c.get('validatedQuery') as any;
    const scope = query.scope || 'active';
    const agentId = query.agentId;

    const sessions = scope === 'history'
      ? getConsultationHistory(agentId ? { agentId } : undefined)
      : getActiveConsultations(agentId);

    return c.json({ success: true, data: sessions });
  } catch (error) {
    return c.json({ error: 'Failed to fetch counseling sessions' }, 500);
  }
});

// Employee ↔ Agent Counseling Routes (employee identity derived from auth context)
services.post('/agent-counseling/employee-to-agent', validateBody(validationSchemas.employeeCounselingToAgent), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const auth = c.get('auth') as any;

    const employeeId = `employee:${auth.userId}`;

    const session = await initiateAgentConsultation(
      employeeId,
      body.agentId,
      body.topic,
      body.question,
      body.options ? {
        ...body.options,
        ...(body.options.deadline ? { deadline: new Date(body.options.deadline) } : {}),
      } : undefined
    );

    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to initiate employee-to-agent counseling' }, 500);
  }
});

services.post('/agent-counseling/agent-to-employee', validateBody(validationSchemas.agentCounselingToEmployee), async (c: AppContext) => {
  try {
    const body = c.get('validatedBody') as any;
    const auth = c.get('auth') as any;

    const employeeId = `employee:${auth.userId}`;

    const session = await initiateAgentConsultation(
      body.agentId,
      employeeId,
      body.topic,
      body.question,
      body.options ? {
        ...body.options,
        ...(body.options.deadline ? { deadline: new Date(body.options.deadline) } : {}),
      } : undefined
    );

    return c.json({ success: true, data: session });
  } catch (error) {
    return c.json({ error: 'Failed to initiate agent-to-employee counseling' }, 500);
  }
});

services.post(
  '/agent-counseling/sessions/:id/respond-as-employee',
  validateParams(validationSchemas.uuidParam),
  validateBody(validationSchemas.employeeCounselingRespond),
  async (c: AppContext) => {
    try {
      const params = c.get('validatedParams') as any;
      const body = c.get('validatedBody') as any;
      const auth = c.get('auth') as any;

      const employeeId = `employee:${auth.userId}`;
      const response = body.response;

      if (response?.actionItems?.length) {
        response.actionItems = response.actionItems.map((a: any) => ({
          ...a,
          ...(a.dueDate ? { dueDate: new Date(a.dueDate) } : {}),
        }));
      }

      const session = await respondToAgentConsultation(params.id, employeeId, response);
      return c.json({ success: true, data: session });
    } catch (error) {
      return c.json({ error: 'Failed to respond to counseling session as employee' }, 500);
    }
  }
);

export default services;
