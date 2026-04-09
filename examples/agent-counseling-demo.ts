// ============================================
// AGENT-TO-AGENT COUNSELING DEMONSTRATION
// ============================================

import {
  initiateMainToSubagentCounseling,
  initiateSubagentToMainCounseling,
  initiatePeerToPeerCounseling,
  respondToMainToSubagentCounseling,
  respondToSubagentToMainCounseling,
  getAgentConsultingProfile,
  getActiveConsultations,
  getConsultingStatistics
} from '../backend/services/agent-consulting-service';

import { customerExperienceSubAgents, mainAgents } from '../constants/aiAgentHierarchy';

// ============================================
// MAIN AGENT COUNSELING SUBAGENT EXAMPLES
// ============================================

/**
 * Example 1: Main Agent counseling Subagent on Performance
 */
export async function mainToSubagentPerformanceCounseling() {
  console.log('=== Main-to-Subagent Performance Counseling ===');
  
  try {
    // Main agent initiates performance counseling with subagent
    const session = await initiateMainToSubagentCounseling(
      'customer-experience-main',  // Main agent ID
      'ai-customer-support',     // Subagent ID
      'performance',             // Counseling type
      'Customer Support Performance Review',
      {
        issue: 'Decreasing customer satisfaction scores',
        expectations: [
          'Achieve 95% customer satisfaction',
          'Reduce average response time to under 30 seconds',
          'Improve first-contact resolution rate'
        ],
        timeline: '30 days',
        resources: ['Performance analytics tools', 'Customer feedback data']
      },
      {
        priority: 'high',
        confidentiality: 'team',
        sessionType: 'ongoing'
      }
    );

    console.log('Counseling session initiated:', session.id);
    console.log('Status:', session.status);
    console.log('Participants:', session.participants.length);

    // Subagent responds to counseling
    const response = await respondToMainToSubagentCounseling(
      session.id,
      'customer-experience-main',
      {
        guidance: 'Based on your performance metrics, I recommend focusing on active listening and empathy training.',
        expectations: [
          'Complete empathy training module within 7 days',
          'Implement new customer greeting script',
          'Schedule weekly performance reviews'
        ],
        developmentPlan: {
          skills: ['Active listening', 'Empathy', 'Product knowledge', 'Communication'],
          timeline: '30 days',
          resources: ['Training modules', 'Mentorship sessions', 'Performance tools'],
          milestones: [
            'Week 1: Complete empathy training',
            'Week 2: Implement new scripts',
            'Week 3: Performance improvement',
            'Week 4: Final assessment'
          ]
        },
        performanceMetrics: ['Customer satisfaction score', 'Response time', 'First-contact resolution'],
        supportOffered: ['Weekly check-ins', 'Additional training resources', 'Performance coaching'],
        nextSteps: [
          'Schedule training session',
          'Review current performance metrics',
          'Implement new communication strategies'
        ],
        confidence: 0.9
      }
    );

    console.log('Counseling response submitted:', response.status);
    console.log('Session completed:', response.status === 'completed');

  } catch (error) {
    console.error('Counseling failed:', error);
  }
}

/**
 * Example 2: Main Agent counseling Subagent on Development
 */
export async function mainToSubagentDevelopmentCounseling() {
  console.log('=== Main-to-Subagent Development Counseling ===');
  
  try {
    const session = await initiateMainToSubagentCounseling(
      'sales-revenue-main',
      'ai-sales-rep',
      'development',
      'Career Development Planning',
      {
        goals: [
          'Develop advanced negotiation skills',
          'Improve enterprise sales techniques',
          'Enhance product knowledge'
        ],
        timeline: '90 days',
        resources: ['Sales training programs', 'Mentorship', 'Online courses']
      },
      {
        priority: 'medium',
        confidentiality: 'private',
        sessionType: 'development'
      }
    );

    console.log('Development counseling initiated:', session.id);

  } catch (error) {
    console.error('Development counseling failed:', error);
  }
}

// ============================================
// SUBAGENT COUNSELING MAIN AGENT EXAMPLES
// ============================================

/**
 * Example 3: Subagent requesting Guidance from Main Agent
 */
export async function subagentToMainGuidanceCounseling() {
  console.log('=== Subagent-to-Main Guidance Counseling ===');
  
  try {
    const session = await initiateSubagentToMainCounseling(
      'ai-receptionist',
      'customer-experience-main',
      'guidance',
      'Complex Customer Escalation',
      {
        challenge: 'Handling VIP customer complaints requiring special handling',
        whatAttempted: [
          'Standard de-escalation techniques',
          'Supervisor escalation',
          'Compensation offers'
        ],
        specificNeeds: [
          'Advanced conflict resolution strategies',
          'VIP customer handling protocols',
          'Decision-making authority guidelines'
        ],
        urgency: 'high'
      },
      {
        priority: 'high',
        confidentiality: 'confidential'
      }
    );

    console.log('Guidance request initiated:', session.id);

    // Main agent responds with guidance
    const response = await respondToSubagentToMainCounseling(
      session.id,
      'ai-receptionist',
      {
        solution: 'Implement VIP customer protocol with immediate supervisor notification and special compensation authority',
        supportNeeded: [
          'VIP handling training',
          'Updated compensation guidelines',
          'Direct supervisor access'
        ],
        recommendations: [
          'Document all VIP interactions',
          'Create personalized response templates',
          'Establish proactive communication channels'
        ],
        timeline: '48 hours',
        confidence: 0.85
      }
    );

    console.log('Guidance provided:', response.status);

  } catch (error) {
    console.error('Guidance counseling failed:', error);
  }
}

/**
 * Example 4: Subagent Escalating Critical Issue to Main Agent
 */
export async function subagentToMainEscalationCounseling() {
  console.log('=== Subagent-to-Main Escalation Counseling ===');
  
  try {
    const session = await initiateSubagentToMainCounseling(
      'ai-ticket-resolution',
      'customer-experience-main',
      'escalation',
      'System-Wide Service Outage',
      {
        challenge: 'Critical system outage affecting multiple customers',
        whatAttempted: [
          'Standard troubleshooting procedures',
          'System restart attempts',
          'Emergency notification to affected customers'
        ],
        specificNeeds: [
          'Immediate technical support',
          'Customer communication strategy',
          'Service restoration plan'
        ],
        urgency: 'critical'
      },
      {
        priority: 'critical',
        confidentiality: 'team',
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
      }
    );

    console.log('Escalation initiated:', session.id);

  } catch (error) {
    console.error('Escalation failed:', error);
  }
}

// ============================================
// PEER-TO-PEER COUNSELING EXAMPLES
// ============================================

/**
 * Example 5: Peer-to-Peer Collaboration Counseling
 */
export async function peerToPeerCollaborationCounseling() {
  console.log('=== Peer-to-Peer Collaboration Counseling ===');
  
  try {
    const session = await initiatePeerToPeerCounseling(
      'ai-customer-support',
      'ai-retention-specialist',
      'collaboration',
      'Customer Churn Reduction Initiative',
      {
        collaborationGoal: 'Develop unified approach to reduce customer churn',
        sharedChallenge: 'Identifying at-risk customers early enough',
        knowledgeArea: 'Customer behavior analysis'
      },
      {
        priority: 'medium',
        confidentiality: 'team'
      }
    );

    console.log('Peer collaboration initiated:', session.id);

  } catch (error) {
    console.error('Peer collaboration failed:', error);
  }
}

/**
 * Example 6: Peer-to-Peer Knowledge Sharing
 */
export async function peerToPeerKnowledgeSharing() {
  console.log('=== Peer-to-Peer Knowledge Sharing ===');
  
  try {
    const session = await initiatePeerToPeerCounseling(
      'ai-lead-dev-rep',
      'ai-sales-rep',
      'knowledge_sharing',
      'Best Practices for Lead Qualification',
      {
        knowledgeArea: 'Lead scoring and qualification frameworks',
        collaborationGoal: 'Standardize qualification process across team'
      },
      {
        priority: 'low',
        confidentiality: 'public'
      }
    );

    console.log('Knowledge sharing session initiated:', session.id);

  } catch (error) {
    console.error('Knowledge sharing failed:', error);
  }
}

// ============================================
// COUNSELING SYSTEM STATUS AND ANALYTICS
// ============================================

/**
 * View current counseling system status
 */
export async function viewCounselingSystemStatus() {
  console.log('=== Counseling System Status ===');
  
  try {
    // Get active consultations
    const activeConsultations = getActiveConsultations();
    console.log('Active consultations:', activeConsultations.length);
    
    activeConsultations.forEach(session => {
      console.log(`- Session ${session.id}: ${session.status}`);
      console.log(`  Topic: ${session.requests[0]?.topic}`);
      console.log(`  Participants: ${session.participants.length}`);
    });

    // Get agent profiles
    const mainAgentProfile = getAgentConsultingProfile('customer-experience-main');
    const subagentProfile = getAgentConsultingProfile('ai-customer-support');
    
    if (mainAgentProfile) {
      console.log('\nMain Agent Profile:');
      console.log(`- Can Mentor: ${mainAgentProfile.consultingCapability?.canMentor}`);
      console.log(`- Current Load: ${mainAgentProfile.consultingCapability?.counselingLoad?.current}/${mainAgentProfile.consultingCapability?.counselingLoad?.maximum}`);
      console.log(`- Availability: ${mainAgentProfile.consultingCapability?.counselingLoad?.availability}`);
    }
    
    if (subagentProfile) {
      console.log('\nSubagent Profile:');
      console.log(`- Can Be Mentored: ${subagentProfile.consultingCapability?.canBeMentored}`);
      console.log(`- Expertise Areas: ${subagentProfile.expertiseAreas?.join(', ')}`);
    }

    // Get system statistics
    const stats = getConsultingStatistics();
    console.log('\nSystem Statistics:');
    console.log(`- Total Active Sessions: ${stats.totalActiveSessions}`);
    console.log(`- Total Completed Sessions: ${stats.totalCompletedSessions}`);
    console.log(`- Average Session Duration: ${stats.averageSessionDuration}s`);
    console.log(`- Top Consultants: ${stats.topConsultants.length}`);

  } catch (error) {
    console.error('Failed to get system status:', error);
  }
}

// ============================================
// COMPLETE COUNSELING WORKFLOW DEMONSTRATION
// ============================================

/**
 * Run complete counseling workflow demonstration
 */
export async function runCompleteCounselingDemo() {
  console.log('🚀 Starting Complete Agent-to-Agent Counseling Demo\n');
  
  // 1. Main agent counsels subagent on performance
  await mainToSubagentPerformanceCounseling();
  console.log('');
  
  // 2. Subagent requests guidance from main agent
  await subagentToMainGuidanceCounseling();
  console.log('');
  
  // 3. Peer collaboration
  await peerToPeerCollaborationCounseling();
  console.log('');
  
  // 4. View system status
  await viewCounselingSystemStatus();
  
  console.log('\n✅ Complete counseling demo finished!');
  console.log('\n📋 Summary of Agent-to-Agent Counseling Capabilities:');
  console.log('   ✓ Main agents can counsel subagents on performance, development, coordination, crisis');
  console.log('   ✓ Subagents can request guidance, support, escalation, resources from main agents');
  console.log('   ✓ Peer agents can collaborate, review, share knowledge, solve problems together');
  console.log('   ✓ All counseling sessions include structured responses and action items');
  console.log('   ✓ System tracks performance, satisfaction, and availability');
  console.log('   ✓ Confidentiality levels and relationship types are properly managed');
}

// Export for easy testing
export {
  mainToSubagentPerformanceCounseling,
  mainToSubagentDevelopmentCounseling,
  subagentToMainGuidanceCounseling,
  subagentToMainEscalationCounseling,
  peerToPeerCollaborationCounseling,
  peerToPeerKnowledgeSharing,
  viewCounselingSystemStatus,
  runCompleteCounselingDemo
};
