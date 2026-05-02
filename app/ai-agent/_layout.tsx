import { Stack } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

export default function AIAgentLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {/* Root screens */}
      <Stack.Screen name="ai-agents-employees" />
      <Stack.Screen name="agent-activation" />
      <Stack.Screen name="agent-history" />
      <Stack.Screen name="agent-insights" />
      <Stack.Screen name="agent-activity" />
      <Stack.Screen name="agent-work" />
      <Stack.Screen name="ai-agent" />
      <Stack.Screen name="ai-receptionist" />
      <Stack.Screen name="ai-negotiation-assistant" />
      <Stack.Screen name="ai-voice-assistant" />
      <Stack.Screen name="ai-workflow" />
      <Stack.Screen name="ai-data-analytics" />
      <Stack.Screen name="smart-task-automation" />
      <Stack.Screen name="memory-context" />
      <Stack.Screen name="personal-assistant" />
      <Stack.Screen name="receptionist-config" />
      <Stack.Screen name="negotiation-config" />
      <Stack.Screen name="call-summary-note" />
      <Stack.Screen name="agent-summary" />
      <Stack.Screen name="agent-status" />
      <Stack.Screen name="agent-performance" />
      <Stack.Screen name="core-intelligence-layer" />
      <Stack.Screen name="ai-workforce-architecture" />
      <Stack.Screen name="a2a-network" />
      <Stack.Screen name="mind-map" />
      <Stack.Screen name="phone" />

      {/* Category screens */}
      <Stack.Screen name="customer-experience-ai" />
      <Stack.Screen name="sales-revenue-ai" />
      <Stack.Screen name="marketing-growth-ai" />
      <Stack.Screen name="operations-management-ai" />
      <Stack.Screen name="data-intelligence-ai" />
      <Stack.Screen name="executive-leadership-ai" />
      <Stack.Screen name="accounting-finance-ai" />
      <Stack.Screen name="product-rnd-ai" />
      <Stack.Screen name="social-media-management-ai" />
      <Stack.Screen name="human-resources-ai" />
      <Stack.Screen name="trading-investment-ai" />
      <Stack.Screen name="it-technology-ai" />
      <Stack.Screen name="legal-compliance-ai" />
      <Stack.Screen name="engineering-development-ai" />
      <Stack.Screen name="ai-personal-assistant-ai" />
      <Stack.Screen name="analysis-performance-ai" />

      {/* Social Media Management AI */}
      <Stack.Screen name="social-media/content-creator" />
      <Stack.Screen name="social-media/post-scheduler" />
      <Stack.Screen name="social-media/community-manager" />
      <Stack.Screen name="social-media/social-analytics" />
      <Stack.Screen name="social-media/influencer-outreach" />
      <Stack.Screen name="social-media/brand-monitor" />
      <Stack.Screen name="social-media/social-ad-manager" />
      <Stack.Screen name="social-media/engagement-optimizer" />

      {/* Executive & Leadership AI */}
      <Stack.Screen name="executive/ceo-advisor" />
      <Stack.Screen name="executive/cfo-analyst" />
      <Stack.Screen name="executive/coo-strategist" />
      <Stack.Screen name="executive/board-advisor" />
      <Stack.Screen name="executive/strategy-planner" />
      <Stack.Screen name="executive/decision-engine" />
      <Stack.Screen name="executive/coo" />
      <Stack.Screen name="executive/cto" />
      <Stack.Screen name="executive/chief-innovation-officer" />

      {/* Accounting & Finance AI */}
      <Stack.Screen name="accounting/bookkeeper" />
      <Stack.Screen name="accounting/tax-analyst" />
      <Stack.Screen name="accounting/financial-planner" />
      <Stack.Screen name="accounting/auditor" />
      <Stack.Screen name="accounting/expense-manager" />
      <Stack.Screen name="accounting/invoice-processor" />
      <Stack.Screen name="accounting/payroll-manager" />
      <Stack.Screen name="accounting/treasury-manager" />
      <Stack.Screen name="accounting/financial-controller" />
      <Stack.Screen name="accounting/credit-manager" />

      {/* Human Resources AI */}
      <Stack.Screen name="hr/onboarding-agent" />
      <Stack.Screen name="hr/performance-reviewer" />
      <Stack.Screen name="hr/benefits-manager" />
      <Stack.Screen name="hr/training-coordinator" />
      <Stack.Screen name="hr/culture-agent" />
      <Stack.Screen name="hr/hr-compliance" />
      <Stack.Screen name="hr/recruiter" />

      {/* Product & R&D AI */}
      <Stack.Screen name="product/ux-researcher" />
      <Stack.Screen name="product/feature-analyst" />
      <Stack.Screen name="product/roadmap-planner" />
      <Stack.Screen name="product/prototype-builder" />
      <Stack.Screen name="product/ab-test-agent" />

      {/* Operations Management AI */}
      <Stack.Screen name="operations/workflow-automation" />
      <Stack.Screen name="operations/task-coordinator" />
      <Stack.Screen name="operations/process-optimization" />
      <Stack.Screen name="operations/resource-planner" />
      <Stack.Screen name="operations/compliance-monitoring" />
      <Stack.Screen name="operations/vendor-management" />
      <Stack.Screen name="operations/quality-control" />
      <Stack.Screen name="operations/operations-manager" />
      <Stack.Screen name="operations/supply-chain-manager" />
      <Stack.Screen name="operations/logistics-coordinator" />

      {/* AI Personal Assistant */}
      <Stack.Screen name="assistant/calendar-manager" />
      <Stack.Screen name="assistant/email-assistant" />
      <Stack.Screen name="assistant/task-prioritizer" />
      <Stack.Screen name="assistant/meeting-summarizer" />
      <Stack.Screen name="assistant/research-agent" />
      <Stack.Screen name="assistant/notification-manager" />
      <Stack.Screen name="assistant/personal-secretary" />

      {/* Standalone AI Agents */}
      <Stack.Screen name="standalone/ai-receptionist" />
      <Stack.Screen name="standalone/ai-sales-rep" />
      <Stack.Screen name="standalone/ai-sales-executive" />
      <Stack.Screen name="standalone/ai-customer-support" />
      <Stack.Screen name="standalone/ai-cmo" />
      <Stack.Screen name="standalone/ai-product-manager" />
      <Stack.Screen name="standalone/ai-operations-manager" />
      <Stack.Screen name="standalone/ai-manager" />
      <Stack.Screen name="standalone/ai-recruiter" />
      <Stack.Screen name="standalone/ai-social-media-manager" />
      <Stack.Screen name="standalone/ai-marketer" />
      <Stack.Screen name="standalone/ai-sales-agent" />
      <Stack.Screen name="standalone/ai-data-analyst" />
      <Stack.Screen name="standalone/ai-lead-dev-rep" />
      <Stack.Screen name="standalone/ai-crm-assistant" />
      <Stack.Screen name="standalone/ai-negotiator" />
      <Stack.Screen name="standalone/ai-sales-data-analyst" />
      <Stack.Screen name="standalone/ai-campaign-optimizer" />
      <Stack.Screen name="standalone/ai-competitive-intel" />
      <Stack.Screen name="standalone/ai-negotiation-specialist" />
      <Stack.Screen name="standalone/ai-retention-specialist" />
      <Stack.Screen name="standalone/ai-pricing-strategist" />
      <Stack.Screen name="standalone/ai-competitive-analyst" />
      <Stack.Screen name="standalone/ai-memory-context" />
      <Stack.Screen name="standalone/ai-upsell-crosssell" />
      <Stack.Screen name="standalone/ai-account-manager" />
      <Stack.Screen name="standalone/ai-proposal-generator" />

      {/* Customer Experience AI sub-agents */}
      <Stack.Screen name="customer-experience/ticket-resolution" />
      <Stack.Screen name="customer-experience/complaint-handling" />
      <Stack.Screen name="customer-experience/loyalty-engagement" />
      <Stack.Screen name="customer-experience/feedback-survey" />
      <Stack.Screen name="customer-experience/billing-support" />

      {/* Sales & Revenue AI sub-agents */}
      <Stack.Screen name="sales-revenue/proposal-generator" />
      <Stack.Screen name="sales-revenue/upsell-crosssell" />
      <Stack.Screen name="sales-revenue/account-manager" />
      <Stack.Screen name="sales-revenue/sales-forecasting" />

      {/* Marketing & Growth AI sub-agents */}
      <Stack.Screen name="marketing/digital-marketer" />
      <Stack.Screen name="marketing/content-generator" />
      <Stack.Screen name="marketing/seo-agent" />
      <Stack.Screen name="marketing/email-marketing" />
      <Stack.Screen name="marketing/audience-targeting" />
      <Stack.Screen name="marketing/growth-hacker" />
      <Stack.Screen name="marketing/agents" />

      {/* Trading & Investment AI */}
      <Stack.Screen name="trading-investment/trading-main" />
      <Stack.Screen name="trading-investment/market-prediction" />
      <Stack.Screen name="trading-investment/algorithmic-trading" />
      <Stack.Screen name="trading-investment/portfolio-manager" />
      <Stack.Screen name="trading-investment/market-sentiment" />
      <Stack.Screen name="trading-investment/technical-analysis" />
      <Stack.Screen name="trading-investment/fundamental-analysis" />
      <Stack.Screen name="trading-investment/trading-risk-manager" />
      <Stack.Screen name="trading-investment/futures-options" />
      <Stack.Screen name="trading-investment/crypto-defi" />
      <Stack.Screen name="trading-investment/forex-trading" />
      <Stack.Screen name="trading-investment/commodities" />
      <Stack.Screen name="trading-investment/quantitative-researcher" />
      <Stack.Screen name="trading-investment/futures-preview" />
      <Stack.Screen name="trading-investment/copy-trading" />
      <Stack.Screen name="trading-investment/macro-economy" />

      {/* Nested routes */}
      <Stack.Screen name="agent/[agentId]" />
      <Stack.Screen name="marketplace/[id]" />
      <Stack.Screen name="industries/[id]" />
      <Stack.Screen name="industries/index" />
      <Stack.Screen name="accounting/expenses" />
      <Stack.Screen name="hr/agents" />
      <Stack.Screen name="marketing/agents" />
      <Stack.Screen name="operations/agents" />

      {/* Management screens */}
      <Stack.Screen name="agent-builder" />
      <Stack.Screen name="agent-counseling" />
      <Stack.Screen name="agent-data-upload" />
      <Stack.Screen name="ai-manager" />
      <Stack.Screen name="monitoring" />
      <Stack.Screen name="model-management" />
      <Stack.Screen name="orchestration" />
      <Stack.Screen name="performance" />
      <Stack.Screen name="performance-reports" />
      <Stack.Screen name="roi-dashboard" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="team-workspace" />
      <Stack.Screen name="training-dashboard" />
      <Stack.Screen name="training-datasets" />
      <Stack.Screen name="version-history" />
      <Stack.Screen name="webhooks-automation" />
      <Stack.Screen name="workflow-builder" />
      <Stack.Screen name="workflow-executions" />
      <Stack.Screen name="workflow-viz" />
      <Stack.Screen name="workflows" />
      <Stack.Screen name="voice-center" />
      <Stack.Screen name="scheduling" />
      <Stack.Screen name="prompt-engineering" />
      <Stack.Screen name="personal-memory" />
      <Stack.Screen name="knowledge-base" />
      <Stack.Screen name="integrations" />
      <Stack.Screen name="import-export" />
      <Stack.Screen name="feedback" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="kaytxx-workforce" />
      <Stack.Screen name="employees" />
      <Stack.Screen name="accounting-agents" />
      <Stack.Screen name="sales-agents" />
      <Stack.Screen name="marketing-agents" />
      <Stack.Screen name="operations-agents" />
      <Stack.Screen name="ai-cmo" />
      <Stack.Screen name="ai-campaign-optimizer" />
      <Stack.Screen name="ai-competitive-analyst" />
      <Stack.Screen name="ai-competitive-intel" />
      <Stack.Screen name="ai-crm-assistant" />
      <Stack.Screen name="ai-customer-support" />
      <Stack.Screen name="ai-data-analytics" />
      <Stack.Screen name="ai-data-analyst" />
      <Stack.Screen name="ai-lead-dev" />
      <Stack.Screen name="ai-lead-dev-rep" />
      <Stack.Screen name="ai-manager" />
    </Stack>
  );
}
