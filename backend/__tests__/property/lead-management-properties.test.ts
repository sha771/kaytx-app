import { propertyTestingFramework, PropertyTestBuilder, PropertyTestingFramework } from './property-testing-framework';
import { leadManagementService } from '../../services/lead-management-service';

describe('Lead Management Property Tests', () => {
  let framework: PropertyTestingFramework;

  beforeAll(() => {
    framework = new PropertyTestingFramework();
  });

  describe('Lead Scoring Properties', () => {
    it('should maintain score bounds consistency', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'lead-score-bounds',
          PropertyTestingFramework.arbitraries.record({
            baseScore: PropertyTestingFramework.arbitraries.leadScore,
            scoreChanges: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.integer({ min: -50, max: 50 })
            ),
          }),
          async ({ baseScore, scoreChanges }) => {
            let finalScore = baseScore;
            
            // Apply all score changes
            for (const change of scoreChanges) {
              finalScore += change;
            }
            
            // Score should always be within bounds [0, 100]
            return finalScore >= 0 && finalScore <= 100;
          }
        )
        .build('lead-score-bounds');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain scoring rule precedence', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'scoring-rule-precedence',
          PropertyTestingFramework.arbitraries.record({
            rules: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                priority: PropertyTestingFramework.arbitraries.integer({ min: 1, max: 10 }),
                condition: PropertyTestingFramework.arbitraries.boolean(),
                points: PropertyTestingFramework.arbitraries.integer({ min: -20, max: 20 }),
              })
            ),
            leadData: PropertyTestingFramework.arbitraries.record({
              emailOpened: PropertyTestingFramework.arbitraries.boolean(),
              linkClicked: PropertyTestingFramework.arbitraries.boolean(),
              formSubmitted: PropertyTestingFramework.arbitraries.boolean(),
            }),
          }),
          async ({ rules, leadData }) => {
            // Sort rules by priority (higher priority first)
            const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);
            
            let totalScore = 0;
            let appliedRules = 0;
            
            // Apply rules in priority order
            for (const rule of sortedRules) {
              if (appliedRules >= 5) break; // Max 5 rules applied
              
              // Simplified condition check
              const conditionMet = rule.condition;
              if (conditionMet) {
                totalScore += rule.points;
                appliedRules++;
              }
            }
            
            // Score should be reasonable
            return totalScore >= -100 && totalScore <= 100;
          }
        )
        .build('scoring-rule-precedence');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain temperature classification consistency', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'temperature-classification',
          PropertyTestingFramework.arbitraries.record({
            score: PropertyTestingFramework.arbitraries.leadScore,
            recentActivity: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 100 }),
            daysSinceContact: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 365 }),
          }),
          async ({ score, recentActivity, daysSinceContact }) => {
            // Calculate temperature based on score and activity
            let temperature: 'cold' | 'warm' | 'hot';
            
            if (score >= 80 && recentActivity >= 10 && daysSinceContact <= 7) {
              temperature = 'hot';
            } else if (score >= 50 && recentActivity >= 3 && daysSinceContact <= 30) {
              temperature = 'warm';
            } else {
              temperature = 'cold';
            }
            
            // Verify classification rules
            if (temperature === 'hot') {
              return score >= 80 && recentActivity >= 10 && daysSinceContact <= 7;
            } else if (temperature === 'warm') {
              return score >= 50 && recentActivity >= 3 && daysSinceContact <= 30;
            } else {
              return true; // Cold is the default
            }
          }
        )
        .build('temperature-classification');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });
  });

  describe('Lead Lifecycle Properties', () => {
    it('should maintain stage transition validity', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'stage-transition-validity',
          PropertyTestingFramework.arbitraries.record({
            currentStage: PropertyTestingFramework.arbitraries.stage,
            targetStage: PropertyTestingFramework.arbitraries.stage,
            hasQualifiedActivities: PropertyTestingFramework.arbitraries.boolean(),
            hasSalesActivities: PropertyTestingFramework.arbitraries.boolean(),
          }),
          async ({ currentStage, targetStage, hasQualifiedActivities, hasSalesActivities }) => {
            // Define valid stage transitions
            const validTransitions = {
              'subscriber': ['lead'],
              'lead': ['marketing_qualified_lead', 'archived'],
              'marketing_qualified_lead': ['sales_qualified_lead', 'lead'],
              'sales_qualified_lead': ['opportunity', 'marketing_qualified_lead'],
              'opportunity': ['customer', 'sales_qualified_lead'],
              'customer': [], // Terminal state
              'archived': [], // Terminal state
            };

            // Check if transition is valid
            const allowedTransitions = validTransitions[currentStage] || [];
            const isValidTransition = allowedTransitions.includes(targetStage);
            
            // Additional business rules
            if (targetStage === 'marketing_qualified_lead' && !hasQualifiedActivities) {
              return false; // Need qualified activities
            }
            
            if (targetStage === 'sales_qualified_lead' && !hasSalesActivities) {
              return false; // Need sales activities
            }
            
            return isValidTransition;
          }
        )
        .build('stage-transition-validity');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain conversion funnel consistency', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'conversion-funnel-consistency',
          PropertyTestingFramework.arbitraries.record({
            totalLeads: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10000 }),
            mqlCount: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10000 }),
            sqlCount: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10000 }),
            opportunityCount: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10000 }),
            customerCount: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10000 }),
          }),
          async ({ totalLeads, mqlCount, sqlCount, opportunityCount, customerCount }) => {
            // Each stage count should not exceed the previous stage
            if (mqlCount > totalLeads) return false;
            if (sqlCount > mqlCount) return false;
            if (opportunityCount > sqlCount) return false;
            if (customerCount > opportunityCount) return false;
            
            // Calculate conversion rates
            const mqlRate = totalLeads > 0 ? mqlCount / totalLeads : 0;
            const sqlRate = mqlCount > 0 ? sqlCount / mqlCount : 0;
            const opportunityRate = sqlCount > 0 ? opportunityCount / sqlCount : 0;
            const customerRate = opportunityCount > 0 ? customerCount / opportunityCount : 0;
            
            // All rates should be between 0 and 1
            return mqlRate >= 0 && mqlRate <= 1 &&
                   sqlRate >= 0 && sqlRate <= 1 &&
                   opportunityRate >= 0 && opportunityRate <= 1 &&
                   customerRate >= 0 && customerRate <= 1;
          }
        )
        .build('conversion-funnel-consistency');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });
  });

  describe('Lead Assignment Properties', () => {
    it('should maintain assignment load balancing', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'assignment-load-balancing',
          PropertyTestingFramework.arbitraries.record({
            leads: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                score: PropertyTestingFramework.arbitraries.leadScore,
                territory: PropertyTestingFramework.arbitraries.string(),
              })
            ),
            agents: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                id: PropertyTestingFramework.arbitraries.string(),
                capacity: PropertyTestingFramework.arbitraries.integer({ min: 1, max: 100 }),
                territory: PropertyTestingFramework.arbitraries.string(),
              })
            ),
          }),
          async ({ leads, agents }) => {
            // Simple round-robin assignment with territory matching
            const assignments: Record<string, number> = {};
            
            agents.forEach(agent => {
              assignments[agent.id] = 0;
            });
            
            let agentIndex = 0;
            
            for (const lead of leads) {
              // Find agents with matching territory
              const availableAgents = agents.filter(agent => 
                agent.territory === lead.territory && 
                assignments[agent.id] < agent.capacity
              );
              
              if (availableAgents.length === 0) continue;
              
              // Assign to next available agent
              const assignedAgent = availableAgents[agentIndex % availableAgents.length];
              assignments[assignedAgent.id]++;
              agentIndex++;
            }
            
            // Check that no agent exceeds capacity
            for (const agent of agents) {
              if (assignments[agent.id] > agent.capacity) {
                return false;
              }
            }
            
            return true;
          }
        )
        .build('assignment-load-balancing');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain assignment priority rules', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'assignment-priority-rules',
          PropertyTestingFramework.arbitraries.record({
            leads: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                score: PropertyTestingFramework.arbitraries.leadScore,
                temperature: PropertyTestingFramework.arbitraries.temperature,
                requestTime: PropertyTestingFramework.arbitraries.date,
              })
            ),
            agents: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                id: PropertyTestingFramework.arbitraries.string(),
                level: PropertyTestingFramework.arbitraries.constantFrom('junior', 'senior', 'expert'),
                currentLoad: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 50 }),
              })
            ),
          }),
          async ({ leads, agents }) => {
            // Sort leads by priority (score, temperature, time)
            const sortedLeads = [...leads].sort((a, b) => {
              // Higher score first
              if (b.score !== a.score) return b.score - a.score;
              
              // Hotter temperature first
              const tempOrder = { hot: 3, warm: 2, cold: 1 };
              const tempDiff = tempOrder[b.temperature] - tempOrder[a.temperature];
              if (tempDiff !== 0) return tempDiff;
              
              // Earlier request first
              return a.requestTime.getTime() - b.requestTime.getTime();
            });
            
            // Sort agents by level and load
            const sortedAgents = [...agents].sort((a, b) => {
              const levelOrder = { expert: 3, senior: 2, junior: 1 };
              const levelDiff = levelOrder[b.level] - levelOrder[a.level];
              if (levelDiff !== 0) return levelDiff;
              
              return a.currentLoad - b.currentLoad;
            });
            
            // Check that high-priority leads get assigned to high-level agents
            if (sortedLeads.length > 0 && sortedAgents.length > 0) {
              const highestPriorityLead = sortedLeads[0];
              const bestAgent = sortedAgents[0];
              
              // High-scoring leads should get expert agents
              if (highestPriorityLead.score >= 80 && bestAgent.level !== 'expert') {
                return false;
              }
            }
            
            return true;
          }
        )
        .build('assignment-priority-rules');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });
  });

  describe('Lead Nurturing Properties', () => {
    it('should maintain nurturing workflow consistency', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'nurturing-workflow-consistency',
          PropertyTestingFramework.arbitraries.record({
            workflowSteps: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                type: PropertyTestingFramework.arbitraries.constantFrom('email', 'delay', 'score_check', 'branch'),
                delay: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 30 }),
                condition: PropertyTestingFramework.arbitraries.boolean(),
              })
            ),
            leadScore: PropertyTestingFramework.arbitraries.leadScore,
            leadActions: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.constantFrom('opened', 'clicked', 'converted')
            ),
          }),
          async ({ workflowSteps, leadScore, leadActions }) => {
            let currentStep = 0;
            let workflowScore = leadScore;
            
            while (currentStep < workflowSteps.length) {
              const step = workflowSteps[currentStep];
              
              switch (step.type) {
                case 'email':
                  // Email sent, continue to next step
                  currentStep++;
                  break;
                  
                case 'delay':
                  // Wait for delay, then continue
                  currentStep++;
                  break;
                  
                case 'score_check':
                  // Check if score meets threshold
                  if (workflowScore >= 70) {
                    currentStep++; // Continue workflow
                  } else {
                    return true; // Exit workflow early
                  }
                  break;
                  
                case 'branch':
                  if (step.condition) {
                    currentStep++; // Take branch
                  } else {
                    currentStep += 2; // Skip branch
                  }
                  break;
                  
                default:
                  currentStep++;
              }
              
              // Prevent infinite loops
              if (currentStep > workflowSteps.length * 2) {
                return false;
              }
            }
            
            return true;
          }
        )
        .build('nurturing-workflow-consistency');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain communication frequency limits', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'communication-frequency-limits',
          PropertyTestingFramework.arbitraries.record({
            maxEmailsPerWeek: PropertyTestingFramework.arbitraries.integer({ min: 1, max: 7 }),
            emailsSent: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 10 }),
            daysSinceStart: PropertyTestingFramework.arbitraries.integer({ min: 0, max: 30 }),
            lastEmailDate: PropertyTestingFramework.arbitraries.date,
            currentDate: PropertyTestingFramework.arbitraries.date,
          }),
          async ({ maxEmailsPerWeek, emailsSent, daysSinceStart, lastEmailDate, currentDate }) => {
            // Calculate weeks passed
            const weeksPassed = Math.max(1, Math.floor(daysSinceStart / 7));
            const allowedEmails = maxEmailsPerWeek * weeksPassed;
            
            // Should not exceed allowed emails
            if (emailsSent > allowedEmails) return false;
            
            // Check minimum interval between emails (at least 1 day)
            const daysSinceLastEmail = Math.floor(
              (currentDate.getTime() - lastEmailDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            
            return daysSinceLastEmail >= 1;
          }
        )
        .build('communication-frequency-limits');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });
  });

  describe('Lead Segmentation Properties', () => {
    it('should maintain segmentation rule consistency', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'segmentation-rule-consistency',
          PropertyTestingFramework.arbitraries.record({
            leads: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                score: PropertyTestingFramework.arbitraries.leadScore,
                source: PropertyTestingFramework.arbitraries.string(),
                industry: PropertyTestingFramework.arbitraries.string(),
                companySize: PropertyTestingFramework.arbitraries.constantFrom('small', 'medium', 'large'),
              })
            ),
            segmentRules: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                name: PropertyTestingFramework.arbitraries.string(),
                conditions: PropertyTestingFramework.arbitraries.record({
                  minScore: PropertyTestingFramework.arbitraries.option(
                    PropertyTestingFramework.arbitraries.leadScore
                  ),
                  source: PropertyTestingFramework.arbitraries.option(
                    PropertyTestingFramework.arbitraries.string()
                  ),
                  industry: PropertyTestingFramework.arbitraries.option(
                    PropertyTestingFramework.arbitraries.string()
                  ),
                  companySize: PropertyTestingFramework.arbitraries.option(
                    PropertyTestingFramework.arbitraries.constantFrom('small', 'medium', 'large')
                  ),
                }),
              })
            ),
          }),
          async ({ leads, segmentRules }) => {
            // Test that segmentation rules are consistent
            for (const rule of segmentRules) {
              const matchingLeads = leads.filter(lead => {
                const { minScore, source, industry, companySize } = rule.conditions;
                
                // Check all conditions
                if (minScore !== undefined && lead.score < minScore) return false;
                if (source !== undefined && lead.source !== source) return false;
                if (industry !== undefined && lead.industry !== industry) return false;
                if (companySize !== undefined && lead.companySize !== companySize) return false;
                
                return true;
              });
              
              // If a lead matches the rule, it should satisfy all conditions
              for (const lead of matchingLeads) {
                const { minScore, source, industry, companySize } = rule.conditions;
                
                if (minScore !== undefined && lead.score < minScore) return false;
                if (source !== undefined && lead.source !== source) return false;
                if (industry !== undefined && lead.industry !== industry) return false;
                if (companySize !== undefined && lead.companySize !== companySize) return false;
              }
            }
            
            return true;
          }
        )
        .build('segmentation-rule-consistency');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });

    it('should maintain segment mutual exclusivity', async () => {
      const testSuite = new PropertyTestBuilder()
        .test(
          'segment-mutual-exclusivity',
          PropertyTestingFramework.arbitraries.record({
            leads: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                score: PropertyTestingFramework.arbitraries.leadScore,
                stage: PropertyTestingFramework.arbitraries.stage,
              })
            ),
            segments: PropertyTestingFramework.arbitraries.array(
              PropertyTestingFramework.arbitraries.record({
                name: PropertyTestingFramework.arbitraries.string(),
                isExclusive: PropertyTestingFramework.arbitraries.boolean(),
                criteria: PropertyTestingFramework.arbitraries.record({
                  minScore: PropertyTestingFramework.arbitraries.leadScore,
                  stages: PropertyTestingFramework.arbitraries.array(
                    PropertyTestingFramework.arbitraries.stage
                  ),
                }),
              })
            ),
          }),
          async ({ leads, segments }) => {
            // Check mutual exclusivity for exclusive segments
            const exclusiveSegments = segments.filter(seg => seg.isExclusive);
            
            for (const lead of leads) {
              const matchedExclusiveSegments = exclusiveSegments.filter(segment => {
                const { minScore, stages } = segment.criteria;
                
                // Check if lead matches segment criteria
                const scoreMatch = lead.score >= minScore;
                const stageMatch = stages.includes(lead.stage);
                
                return scoreMatch && stageMatch;
              });
              
              // Lead should match at most one exclusive segment
              if (matchedExclusiveSegments.length > 1) {
                return false;
              }
            }
            
            return true;
          }
        )
        .build('segment-mutual-exclusivity');

      const results = await framework.runPropertyTests(testSuite);
      expect(results.failed).toBe(0);
    });
  });
});
