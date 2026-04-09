/**
 * Social CRM AI Agent Integration Service
 * Integrates Sales & Revenue AI and Customer Experience AI agents with CRM functionality
 * Supports agent-to-agent consulting for customer relationship management
 */

import { AIAgent } from '../../constants/aiAgentHierarchy';
import { 
  a2aCommunicationService, 
  ConsultationSession 
} from '../services/a2a-communication-service';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface CRMContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned' | 'champion';
  source: string;
  tags: string[];
  assignedAgentId?: string;
  assignedSalesRepId?: string;
  score: number; // 0-100 lead score
  lastActivityAt?: Date;
  createdAt: Date;
  customFields?: Record<string, any>;
}

export interface CRMDeal {
  id: string;
  name: string;
  contactId: string;
  value: number;
  currency: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: Date;
  assignedAgentId?: string;
  activities: string[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CRMActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal_created' | 'deal_updated';
  contactId?: string;
  dealId?: string;
  agentId?: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface CRMTask {
  id: string;
  type: 'lead_qualification' | 'deal_management' | 'contact_update' | 'follow_up' | 'negotiation' | 'escalation';
  agentId: string;
  status: 'pending' | 'in_progress' | 'completed';
  input: Record<string, any>;
  output?: Record<string, any>;
  consultationIds?: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface LeadScoreResult {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  factors: { positive: string[]; negative: string[] };
  recommendations: string[];
  nextActions: string[];
}

// ============================================
// SOCIAL CRM AI AGENT SERVICE
// ============================================

class SocialCRMAgentService {
  private tasks: Map<string, CRMTask> = new Map();
  private contacts: Map<string, CRMContact> = new Map();
  private deals: Map<string, CRMDeal> = new Map();
  private activities: Map<string, CRMActivity> = new Map();
  
  // ============================================
  // LEAD MANAGEMENT
  // ============================================
  
  /**
   * AI Lead Development Rep (SDR) qualifies leads
   * Consults with Sales Rep for complex qualification scenarios
   */
  async qualifyLead(
    contact: CRMContact,
    sdrId: string = 'ai-lead-dev-rep'
  ): Promise<{ task: CRMTask; score: LeadScoreResult; consultation?: ConsultationSession }> {
    const task = this.createTask('lead_qualification', sdrId, { contact });
    
    // Calculate lead score
    const score = this.calculateLeadScore(contact);
    
    let consultation: ConsultationSession | undefined;
    
    // If high-value lead, consult with Sales Rep
    if (score.score >= 80) {
      consultation = await a2aCommunicationService.peerConsultation(
        sdrId,
        'ai-sales-rep',
        'collaborative',
        `High-value lead: ${contact.name}`,
        `Lead ${contact.name} scored ${score.score}/100. Recommendations: ${score.recommendations.join(', ')}`
      );
      task.consultationIds = [consultation.id];
      
      // Update contact with sales rep assignment
      contact.assignedSalesRepId = 'ai-sales-rep';
    }
    
    contact.score = score.score;
    this.contacts.set(contact.id, contact);
    
    this.logActivity({
      type: 'note',
      contactId: contact.id,
      agentId: sdrId,
      description: `Lead qualified with score ${score.score}/100, grade ${score.grade}`,
    });
    
    this.completeTask(task.id, { score, contactId: contact.id });
    
    return { task, score, consultation };
  }
  
  /**
   * AI Sales Rep manages deal progression
   * Consults with Negotiator for deal closure
   */
  async manageDeal(
    deal: CRMDeal,
    action: 'progress' | 'negotiate' | 'close',
    salesRepId: string = 'ai-sales-rep'
  ): Promise<{ task: CRMTask; deal: CRMDeal; consultations: ConsultationSession[] }> {
    const task = this.createTask('deal_management', salesRepId, { deal, action });
    const consultations: ConsultationSession[] = [];
    
    if (action === 'negotiate') {
      // Consult with AI Negotiator for negotiation strategy
      const negotiationConsultation = await a2aCommunicationService.peerConsultation(
        salesRepId,
        'ai-negotiator',
        'advisory',
        `Negotiation strategy: ${deal.name}`,
        `Deal value: $${deal.value}, stage: ${deal.stage}. Need negotiation strategy.`
      );
      consultations.push(negotiationConsultation);
      
      // Consult with Pricing Strategist for pricing optimization
      const pricingConsultation = await a2aCommunicationService.peerConsultation(
        salesRepId,
        'ai-pricing-strategist',
        'analytical',
        `Pricing optimization: ${deal.name}`,
        `Optimize pricing strategy for deal ${deal.name}`
      );
      consultations.push(pricingConsultation);
    }
    
    if (action === 'close') {
      // Consult with Sales Executive for deal closure approval
      const closureConsultation = await a2aCommunicationService.subagentEscalatesToMainAgent(
        salesRepId,
        'sales-revenue-main',
        `Deal closure approval: ${deal.name}`,
        `Requesting approval to close deal ${deal.name} worth $${deal.value}`
      );
      consultations.push(closureConsultation);
    }
    
    // Update deal
    if (action === 'progress') {
      deal.stage = this.progressStage(deal.stage);
    } else if (action === 'close') {
      deal.stage = 'closed_won';
    }
    deal.updatedAt = new Date();
    this.deals.set(deal.id, deal);
    
    task.consultationIds = consultations.map(c => c.id);
    this.completeTask(task.id, { deal, action });
    
    this.logActivity({
      type: 'deal_updated',
      dealId: deal.id,
      contactId: deal.contactId,
      agentId: salesRepId,
      description: `Deal ${action}d to ${deal.stage}`,
    });
    
    return { task, deal, consultations };
  }
  
  // ============================================
  // CUSTOMER SUCCESS
  // ============================================
  
  /**
   * AI Account Manager handles customer success
   * Consults with Upsell Agent for expansion opportunities
   */
  async manageAccount(
    contactId: string,
    action: 'health_check' | 'expansion' | 'renewal' | 'risk_assessment',
    accountManagerId: string = 'ai-account-manager'
  ): Promise<{ task: CRMTask; result: any; consultation?: ConsultationSession }> {
    const contact = this.contacts.get(contactId);
    if (!contact) throw new Error('Contact not found');
    
    const task = this.createTask('contact_update', accountManagerId, { contactId, action });
    
    let consultation: ConsultationSession | undefined;
    let result: any;
    
    switch (action) {
      case 'health_check':
        result = {
          healthScore: 85,
          status: 'healthy',
          lastEngagement: '2 days ago',
          satisfaction: 4.5,
        };
        break;
        
      case 'expansion':
        // Consult with Upsell Agent for expansion opportunities
        consultation = await a2aCommunicationService.peerConsultation(
          accountManagerId,
          'ai-upsell-cross-sell',
          'analytical',
          `Expansion opportunity: ${contact.name}`,
          `Identify upsell/cross-sell opportunities for ${contact.name}`
        );
        
        result = {
          opportunities: [
            { product: 'Premium Plan', probability: 0.75, potentialValue: 5000 },
            { product: 'Add-on Module', probability: 0.60, potentialValue: 2000 },
          ],
          recommendedApproach: 'Schedule QBR to discuss growth',
        };
        break;
        
      case 'risk_assessment':
        // Escalate to Retention Specialist if at risk
        consultation = await a2aCommunicationService.peerConsultation(
          accountManagerId,
          'ai-retention-specialist',
          'advisory',
          `Risk assessment: ${contact.name}`,
          `Assess churn risk for ${contact.name}`
        );
        
        result = {
          riskLevel: 'low',
          factors: ['High engagement', 'Recent expansion'],
          recommendations: ['Continue regular check-ins'],
        };
        break;
    }
    
    if (consultation) {
      task.consultationIds = [consultation.id];
    }
    
    this.completeTask(task.id, { result, action });
    
    return { task, result, consultation };
  }
  
  // ============================================
  // MAIN/SUBAGENT CONSULTING
  // ============================================
  
  /**
   * Sales & Revenue Main Agent coordinates deal strategy
   */
  async coordinateDealStrategy(
    dealId: string,
    participatingAgentIds: string[]
  ): Promise<{ consultations: ConsultationSession[]; strategy: any }> {
    const mainAgentId = 'sales-revenue-main';
    const consultations: ConsultationSession[] = [];
    
    for (const agentId of participatingAgentIds) {
      const consultation = await a2aCommunicationService.mainAgentConsultsSubagent(
        mainAgentId,
        agentId,
        `Deal strategy coordination: ${dealId}`,
        `Coordinate strategy for deal ${dealId}`,
        'high'
      );
      consultations.push(consultation);
    }
    
    const strategy = {
      approach: 'multi-touch',
      timeline: '2 weeks',
      keyStakeholders: participatingAgentIds,
      riskMitigation: ['Competitor analysis', 'Pricing flexibility'],
    };
    
    return { consultations, strategy };
  }
  
  /**
   * Escalate complex CRM scenario to Main Agent
   */
  async escalateToMainAgent(
    subAgentId: string,
    escalationReason: string,
    context: Record<string, any>
  ): Promise<ConsultationSession> {
    return a2aCommunicationService.subagentEscalatesToMainAgent(
      subAgentId,
      'sales-revenue-main',
      `CRM Escalation: ${escalationReason}`,
      escalationReason,
      context
    );
  }
  
  /**
   * Cross-functional consultation between Sales and Customer Experience agents
   */
  async crossFunctionalConsultation(
    salesAgentId: string,
    customerExperienceAgentId: string,
    contactId: string,
    topic: string
  ): Promise<ConsultationSession> {
    return a2aCommunicationService.peerConsultation(
      salesAgentId,
      customerExperienceAgentId,
      'collaborative',
      `Cross-functional: ${topic}`,
      `Collaborative approach for contact ${contactId}: ${topic}`
    );
  }
  
  // ============================================
  // CRM AUTOMATION
  // ============================================
  
  /**
   * AI CRM Assistant automates CRM updates
   */
  async automateCRMUpdate(
    updateType: 'contact' | 'deal' | 'activity',
    data: any,
    crmAssistantId: string = 'ai-crm-assistant'
  ): Promise<CRMTask> {
    const task = this.createTask('contact_update', crmAssistantId, { updateType, data });
    
    switch (updateType) {
      case 'contact':
        this.contacts.set(data.id, { ...this.contacts.get(data.id), ...data });
        break;
      case 'deal':
        this.deals.set(data.id, { ...this.deals.get(data.id), ...data, updatedAt: new Date() });
        break;
      case 'activity':
        this.logActivity(data);
        break;
    }
    
    this.completeTask(task.id, { updated: true, type: updateType });
    return task;
  }
  
  // ============================================
  // QUERY METHODS
  // ============================================
  
  getContact(contactId: string): CRMContact | undefined {
    return this.contacts.get(contactId);
  }
  
  getDeal(dealId: string): CRMDeal | undefined {
    return this.deals.get(dealId);
  }
  
  getContactDeals(contactId: string): CRMDeal[] {
    return Array.from(this.deals.values()).filter(d => d.contactId === contactId);
  }
  
  getContactActivities(contactId: string): CRMActivity[] {
    return Array.from(this.activities.values())
      .filter(a => a.contactId === contactId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
  
  getTasksByAgent(agentId: string): CRMTask[] {
    return Array.from(this.tasks.values()).filter(t => t.agentId === agentId);
  }
  
  getHighValueLeads(minScore: number = 80): CRMContact[] {
    return Array.from(this.contacts.values())
      .filter(c => c.score >= minScore && c.status === 'lead')
      .sort((a, b) => b.score - a.score);
  }
  
  getPipelineDeals(): CRMDeal[] {
    return Array.from(this.deals.values())
      .filter(d => !['closed_won', 'closed_lost'].includes(d.stage))
      .sort((a, b) => b.value - a.value);
  }
  
  getServiceStats(): {
    totalContacts: number;
    totalDeals: number;
    totalPipelineValue: number;
    tasksCompleted: number;
    activeConsultations: number;
    avgDealSize: number;
  } {
    const deals = Array.from(this.deals.values());
    const pipelineDeals = deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage));
    
    return {
      totalContacts: this.contacts.size,
      totalDeals: this.deals.size,
      totalPipelineValue: pipelineDeals.reduce((sum, d) => sum + d.value, 0),
      tasksCompleted: Array.from(this.tasks.values()).filter(t => t.status === 'completed').length,
      activeConsultations: Array.from(this.tasks.values()).filter(t => 
        t.consultationIds && t.consultationIds.length > 0
      ).length,
      avgDealSize: deals.length > 0 
        ? deals.reduce((sum, d) => sum + d.value, 0) / deals.length 
        : 0,
    };
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private createTask(
    type: CRMTask['type'],
    agentId: string,
    input: Record<string, any>
  ): CRMTask {
    const task: CRMTask = {
      id: this.generateId(),
      type,
      agentId,
      status: 'pending',
      input,
      createdAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }
  
  private completeTask(taskId: string, output: Record<string, any>): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'completed';
      task.output = output;
      task.completedAt = new Date();
    }
  }
  
  private logActivity(activity: Omit<CRMActivity, 'id' | 'timestamp'>): void {
    const fullActivity: CRMActivity = {
      ...activity,
      id: this.generateId(),
      timestamp: new Date(),
    };
    this.activities.set(fullActivity.id, fullActivity);
  }
  
  private calculateLeadScore(contact: CRMContact): LeadScoreResult {
    let score = 50; // Base score
    const positive: string[] = [];
    const negative: string[] = [];
    
    // Positive factors
    if (contact.company) {
      score += 15;
      positive.push('Has company information');
    }
    if (contact.title?.toLowerCase().includes('director') || contact.title?.toLowerCase().includes('manager')) {
      score += 20;
      positive.push('Decision maker title');
    }
    if (contact.source === 'referral') {
      score += 25;
      positive.push('Referral source');
    }
    if (contact.tags.includes('enterprise')) {
      score += 15;
      positive.push('Enterprise segment');
    }
    
    // Negative factors
    if (!contact.phone) {
      score -= 10;
      negative.push('No phone number');
    }
    if (contact.tags.includes('competitor')) {
      score -= 20;
      negative.push('Competitor association');
    }
    
    score = Math.max(0, Math.min(100, score));
    
    let grade: 'A' | 'B' | 'C' | 'D' = 'D';
    if (score >= 80) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 40) grade = 'C';
    
    return {
      score,
      grade,
      factors: { positive, negative },
      recommendations: [
        'Schedule discovery call within 24 hours',
        'Research company background',
        'Prepare personalized demo',
      ],
      nextActions: score >= 80 
        ? ['Immediate outreach', 'Priority handling'] 
        : ['Nurture with content', 'Schedule follow-up'],
    };
  }
  
  private progressStage(currentStage: CRMDeal['stage']): CRMDeal['stage'] {
    const stages: CRMDeal['stage'][] = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won'];
    const currentIndex = stages.indexOf(currentStage);
    return stages[Math.min(currentIndex + 1, stages.length - 1)];
  }
  
  private generateId(): string {
    return `crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ============================================
// EXPORT
// ============================================

export const socialCRMAgentService = new SocialCRMAgentService();

export const useSocialCRMAgents = () => {
  return {
    qualifyLead: socialCRMAgentService.qualifyLead.bind(socialCRMAgentService),
    manageDeal: socialCRMAgentService.manageDeal.bind(socialCRMAgentService),
    manageAccount: socialCRMAgentService.manageAccount.bind(socialCRMAgentService),
    coordinateDealStrategy: socialCRMAgentService.coordinateDealStrategy.bind(socialCRMAgentService),
    escalateToMainAgent: socialCRMAgentService.escalateToMainAgent.bind(socialCRMAgentService),
    crossFunctionalConsultation: socialCRMAgentService.crossFunctionalConsultation.bind(socialCRMAgentService),
    automateCRMUpdate: socialCRMAgentService.automateCRMUpdate.bind(socialCRMAgentService),
    getContact: socialCRMAgentService.getContact.bind(socialCRMAgentService),
    getDeal: socialCRMAgentService.getDeal.bind(socialCRMAgentService),
    getContactDeals: socialCRMAgentService.getContactDeals.bind(socialCRMAgentService),
    getContactActivities: socialCRMAgentService.getContactActivities.bind(socialCRMAgentService),
    getTasksByAgent: socialCRMAgentService.getTasksByAgent.bind(socialCRMAgentService),
    getHighValueLeads: socialCRMAgentService.getHighValueLeads.bind(socialCRMAgentService),
    getPipelineDeals: socialCRMAgentService.getPipelineDeals.bind(socialCRMAgentService),
    getServiceStats: socialCRMAgentService.getServiceStats.bind(socialCRMAgentService),
  };
};

export default socialCRMAgentService;
