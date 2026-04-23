import {
  initiateMainToSubagentCounseling,
  respondToAgentConsultation,
  getActiveConsultations,
} from '@/backend/services/agent-consulting-service';

describe('AgentConsultingService - agent-to-agent counseling', () => {
  test('main agent can counsel subagent and session completes on response', async () => {
    const session = await initiateMainToSubagentCounseling(
      'customer-experience-main',
      'ai-customer-support',
      'performance',
      'Support performance review',
      {
        issue: 'Response time is too slow',
        expectations: ['Improve first response time'],
        timeline: '14 days',
        resources: ['Playbook', 'Training set'],
      },
      {
        priority: 'high',
        confidentiality: 'team',
        sessionType: 'one_time',
      }
    );

    expect(session.id).toBeTruthy();
    expect(session.status).toBe('pending');

    const updated = await respondToAgentConsultation(session.id, 'customer-experience-main', {
      status: 'completed',
      answer: 'Focus on triage automation and canned responses.',
      recommendations: ['Add triage rules', 'Use canned responses'],
      confidence: 0.8,
      reasoning: 'Historical metrics show better outcomes with automation.',
      caveats: [],
      requiresFollowUp: true,
      suggestedNextSteps: ['Implement triage', 'Review in 7 days'],
    });

    expect(updated.status).toBe('completed');

    const stillActive = getActiveConsultations();
    expect(stillActive.find(s => s.id === session.id)).toBeUndefined();
  });
});
