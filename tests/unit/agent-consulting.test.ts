import { AIAgentService, type AgentConfig, type AgentToAgentConsultRequest } from '../../backend/services/ai-agent-service';
import { agentExecutionEngine } from '../../backend/lib/agent-execution';
import { logAudit } from '../../backend/lib/audit';

jest.mock('../../backend/lib/agent-execution', () => ({
  agentExecutionEngine: {
    executeAgent: jest.fn(),
  },
}));

jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn(),
}));

describe('AIAgentService.consultAgent', () => {
  it('executes target agent then consulting agent and returns consulting response', async () => {
    const consultingAgent: AgentConfig = {
      id: 'consulting-agent-id',
      name: 'Agent Consulting',
      type: 'research_assistant',
      systemPrompt: 'consulting-system',
      tools: [],
    };

    const targetAgent: AgentConfig = {
      id: 'target-agent-id',
      name: 'Customer Experience AI',
      type: 'chat_bot',
      systemPrompt: 'target-system',
      tools: [],
    };

    const svc = Object.create(AIAgentService.prototype) as AIAgentService;
    (svc as any).resolveConsultingTarget = jest.fn().mockResolvedValue({ consultingAgent, targetAgent });

    (agentExecutionEngine.executeAgent as jest.Mock)
      .mockResolvedValueOnce({ success: true, result: { message: 'target-response' } })
      .mockResolvedValueOnce({ success: true, result: { message: 'consulting-response' } });

    const req: AgentToAgentConsultRequest = {
      fromAgentId: 'main-agent-id',
      query: 'How should we handle a refund request?',
      domain: 'customer experience',
      context: { ticketId: 'T-123' },
    };

    const result = await svc.consultAgent('org-1', 'user-1', req);

    expect((svc as any).resolveConsultingTarget).toHaveBeenCalledWith('org-1', req);

    expect(agentExecutionEngine.executeAgent).toHaveBeenCalledTimes(2);

    const firstCall = (agentExecutionEngine.executeAgent as jest.Mock).mock.calls[0];
    expect(firstCall[0].id).toBe(targetAgent.id);
    expect(firstCall[1].agentId).toBe(targetAgent.id);
    expect(firstCall[2]).toBe(req.query);

    const secondCall = (agentExecutionEngine.executeAgent as jest.Mock).mock.calls[1];
    expect(secondCall[0].id).toBe(consultingAgent.id);
    expect(secondCall[1].agentId).toBe(consultingAgent.id);
    expect(String(secondCall[2])).toContain('target-response');

    expect(logAudit).toHaveBeenCalledTimes(1);

    expect(result.consultingAgentId).toBe(consultingAgent.id);
    expect(result.targetAgentId).toBe(targetAgent.id);
    expect(result.response).toBe('consulting-response');
  });
});
