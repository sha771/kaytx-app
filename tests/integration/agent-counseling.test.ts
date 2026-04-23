/**
 * AGENT-TO-AGENT COUNSELING - INTEGRATION TEST
 * Tests all three counseling relationships:
 * 1. Main Agent → Subagent (Mentorship/Performance)
 * 2. Subagent → Main Agent (Guidance/Escalation)
 * 3. Peer-to-Peer (Collaboration)
 */

import {
  initiateMainToSubagentCounseling,
  initiateSubagentToMainCounseling,
  initiatePeerToPeerCounseling,
  respondToMainToSubagentCounseling,
  respondToSubagentToMainCounseling,
  getAgentConsultingProfile,
  getActiveConsultations,
  getConsultingStatistics,
  agentConsultingService
} from '../backend/services/agent-consulting-service';

// Test 1: Main Agent Counseling Subagent
async function testMainToSubagentCounseling() {
  console.log('🧪 TEST 1: Main Agent → Subagent Counseling\n');

  try {
    // Step 1: Main agent initiates counseling
    const session = await initiateMainToSubagentCounseling(
      'customer-experience-main',    // Main agent
      'ai-receptionist',            // Subagent
      'performance',                // Counseling type
      'Reception Performance Review',
      {
        issue: 'Call handling efficiency needs improvement',
        expectations: [
          'Answer calls within 3 rings',
          'Maintain 98% customer greeting compliance',
          'Reduce call transfer errors'
        ],
        timeline: '30 days',
        resources: ['Call handling training', 'New greeting scripts']
      },
      {
        priority: 'medium',
        confidentiality: 'team',
        sessionType: 'ongoing'
      }
    );

    console.log('✅ Session created:', session.id);
    console.log('   Type:', session.requests[0]?.type);
    console.log('   Status:', session.status);
    console.log('   Participants:', session.participants.map(p => p.agentName).join(', '));

    // Step 2: Main agent provides counseling response
    const response = await respondToMainToSubagentCounseling(
      session.id,
      'customer-experience-main',
      {
        guidance: 'Your performance metrics show good potential, but we need to focus on three key areas for improvement.',
        expectations: [
          'Complete call handling certification by week 2',
          'Implement new greeting protocol immediately',
          'Schedule weekly performance check-ins'
        ],
        developmentPlan: {
          skills: ['Active listening', 'Call routing efficiency', 'Customer empathy'],
          timeline: '30 days',
          resources: ['Online training portal', 'Mentor sessions with senior agents', 'Call recording reviews'],
          milestones: [
            'Week 1: Training completion & new script implementation',
            'Week 2: First performance checkpoint',
            'Week 3: Peer feedback session',
            'Week 4: Final assessment & certification'
          ]
        },
        performanceMetrics: ['Call answer speed', 'Customer satisfaction', 'Transfer accuracy'],
        supportOffered: ['Daily mentor check-ins', 'Access to training materials', 'Priority support queue'],
        nextSteps: [
          'Enroll in call handling certification',
          'Review and practice new greeting scripts',
          'Schedule first mentor session'
        ],
        confidence: 0.92
      }
    );

    console.log('✅ Counseling response submitted');
    console.log('   Response status:', response.status);
    console.log('   Counseling type:', response.requests[0]?.counselingContext?.relationship);
    console.log('');

    return true;
  } catch (error) {
    console.error('❌ Test 1 failed:', error);
    return false;
  }
}

// Test 2: Subagent Requesting Guidance from Main Agent
async function testSubagentToMainCounseling() {
  console.log('🧪 TEST 2: Subagent → Main Agent Guidance Request\n');

  try {
    // Step 1: Subagent requests guidance
    const session = await initiateSubagentToMainCounseling(
      'ai-customer-support',        // Subagent
      'customer-experience-main',  // Main agent
      'guidance',                  // Request type
      'Complex Escalation Handling',
      {
        challenge: 'Handling VIP customer complaints requiring executive attention',
        whatAttempted: [
          'Standard de-escalation techniques',
          'Manager notification',
          'Compensation offers within authority limit'
        ],
        specificNeeds: [
          'Executive escalation protocol',
          'VIP customer handling guidelines',
          'Decision-making authority clarification'
        ],
        urgency: 'high'
      },
      {
        priority: 'high',
        confidentiality: 'confidential'
      }
    );

    console.log('✅ Guidance request created:', session.id);
    console.log('   Request type:', session.requests[0]?.type);
    console.log('   Relationship:', session.requests[0]?.counselingContext?.relationship);
    console.log('   Urgency:', session.requests[0]?.counselingContext?.performanceContext?.severity);

    // Step 2: Main agent responds with guidance
    const response = await respondToSubagentToMainCounseling(
      session.id,
      'ai-customer-support',
      {
        solution: 'Implement the VIP Customer Protocol: Immediately escalate to Customer Experience Manager and document all interactions in VIP tracking system.',
        supportNeeded: [
          'VIP handling authorization',
          'Direct manager contact info',
          'Compensation authority up to $500'
        ],
        recommendations: [
          'Use VIP greeting: "Thank you for being a valued customer"',
          'Document all interactions within 15 minutes',
          'Offer immediate callback from manager within 2 hours',
          'Create personalized resolution plan'
        ],
        timeline: 'Immediate implementation',
        confidence: 0.88
      }
    );

    console.log('✅ Guidance provided');
    console.log('   Response status:', response.status);
    console.log('   Solution offered:', !!response.responses[0]?.counselingGuidance?.coordinationPlan);
    console.log('');

    return true;
  } catch (error) {
    console.error('❌ Test 2 failed:', error);
    return false;
  }
}

// Test 3: Peer-to-Peer Collaboration
async function testPeerToPeerCounseling() {
  console.log('🧪 TEST 3: Peer-to-Peer Collaboration\n');

  try {
    const session = await initiatePeerToPeerCounseling(
      'ai-customer-support',       // Peer 1
      'ai-retention-specialist',   // Peer 2
      'collaboration',             // Counseling type
      'Customer Churn Prevention Strategy',
      {
        collaborationGoal: 'Develop unified approach to identify and retain at-risk customers',
        sharedChallenge: 'Early identification of churn risk before escalation',
        knowledgeArea: 'Customer behavior patterns and retention triggers'
      },
      {
        priority: 'medium',
        confidentiality: 'team'
      }
    );

    console.log('✅ Peer collaboration initiated:', session.id);
    console.log('   Collaboration type:', session.requests[0]?.type);
    console.log('   Relationship:', session.requests[0]?.counselingContext?.relationship);
    console.log('   Participants:', session.participants.map(p => `${p.agentName} (${p.role})`).join(', '));
    console.log('');

    return true;
  } catch (error) {
    console.error('❌ Test 3 failed:', error);
    return false;
  }
}

// Test 4: System Status & Analytics
async function testSystemAnalytics() {
  console.log('🧪 TEST 4: System Analytics & Status\n');

  try {
    // Check main agent counseling profile
    const mainProfile = getAgentConsultingProfile('customer-experience-main');
    console.log('📊 Main Agent Profile (customer-experience-main):');
    if (mainProfile) {
      console.log('   Counseling Role:', mainProfile.consultingCapability?.counselingRole);
      console.log('   Can Mentor:', mainProfile.consultingCapability?.canMentor);
      console.log('   Load:', `${mainProfile.consultingCapability?.counselingLoad?.current}/${mainProfile.consultingCapability?.counselingLoad?.maximum}`);
      console.log('   Availability:', mainProfile.consultingCapability?.counselingLoad?.availability);
      console.log('   Mentoring Capabilities:', JSON.stringify(mainProfile.a2aCapability?.mentoringCapabilities, null, 2).replace(/"/g, '').replace(/\n/g, ' '));
    }

    // Check subagent counseling profile
    const subProfile = getAgentConsultingProfile('ai-receptionist');
    console.log('\n📊 Subagent Profile (ai-receptionist):');
    if (subProfile) {
      console.log('   Counseling Role:', subProfile.consultingCapability?.counselingRole);
      console.log('   Can Be Mentored:', subProfile.consultingCapability?.canBeMentored);
      console.log('   Can Mentor Subagents:', subProfile.a2aCapability?.mentoringCapabilities?.canMentorSubagents);
      console.log('   Can Be Mentored by Main:', subProfile.a2aCapability?.mentoringCapabilities?.canBeMentoredByMain);
    }

    // Active sessions
    const activeSessions = getActiveConsultations();
    console.log('\n📊 Active Counseling Sessions:', activeSessions.length);
    activeSessions.forEach((session, index) => {
      console.log(`   Session ${index + 1}: ${session.requests[0]?.topic}`);
      console.log(`   - Status: ${session.status}`);
      console.log(`   - Type: ${session.requests[0]?.counselingContext?.relationship}`);
      console.log(`   - Participants: ${session.participants.length}`);
    });

    // System statistics
    const stats = getConsultingStatistics();
    console.log('\n📊 System Statistics:');
    console.log('   Total Active:', stats.totalActiveSessions);
    console.log('   Total Completed:', stats.totalCompletedSessions);
    console.log('   Average Duration:', `${stats.averageSessionDuration}s`);
    console.log('   Top Consultants:', stats.topConsultants.length);
    console.log('');

    return true;
  } catch (error) {
    console.error('❌ Test 4 failed:', error);
    return false;
  }
}

// Main Test Runner
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  AGENT-TO-AGENT COUNSELING SYSTEM - INTEGRATION TESTS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const results = {
    test1: await testMainToSubagentCounseling(),
    test2: await testSubagentToMainCounseling(),
    test3: await testPeerToPeerCounseling(),
    test4: await testSystemAnalytics()
  };

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  TEST RESULTS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Test 1 - Main → Subagent Counseling:     ${results.test1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Test 2 - Subagent → Main Guidance:       ${results.test2 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Test 3 - Peer-to-Peer Collaboration:     ${results.test3 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Test 4 - System Analytics:               ${results.test4 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('═══════════════════════════════════════════════════════════════');

  const allPassed = Object.values(results).every(r => r);
  console.log(allPassed ? '\n🎉 ALL TESTS PASSED!' : '\n⚠️  SOME TESTS FAILED');

  if (allPassed) {
    console.log('\n✨ AGENT-TO-AGENT COUNSELING SYSTEM IS FULLY OPERATIONAL ✨');
    console.log('\nSupported Counseling Relationships:');
    console.log('   • Main Agent → Subagent (Performance, Development, Crisis, Coordination)');
    console.log('   • Subagent → Main Agent (Guidance, Support, Escalation, Resource Request)');
    console.log('   • Peer ↔ Peer (Collaboration, Knowledge Sharing, Problem Solving)');
  }

  return allPassed;
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

export { runAllTests, testMainToSubagentCounseling, testSubagentToMainCounseling, testPeerToPeerCounseling, testSystemAnalytics };
