import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Sparkles,
  RefreshCw,
  Bell,
  Settings,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
} from 'lucide-react-native';
import ExecutiveKPIBar from '@/components/ai-agent/dashboard/finance-accounting/ExecutiveKPIBar';
import CFOCommandCenter from '@/components/ai-agent/dashboard/finance-accounting/CFOCommandCenter';
import CashFlowIntelligence from '@/components/ai-agent/dashboard/finance-accounting/CashFlowIntelligence';
import AccountsReceivableCenter from '@/components/ai-agent/dashboard/finance-accounting/AccountsReceivableCenter';
import AccountsPayableCenter from '@/components/ai-agent/dashboard/finance-accounting/AccountsPayableCenter';
import BudgetVsActualAnalytics from '@/components/ai-agent/dashboard/finance-accounting/BudgetVsActualAnalytics';
import FinancialForecastingEngine from '@/components/ai-agent/dashboard/finance-accounting/FinancialForecastingEngine';
import ExpenseManagementCenter from '@/components/ai-agent/dashboard/finance-accounting/ExpenseManagementCenter';
import AuditComplianceControl from '@/components/ai-agent/dashboard/finance-accounting/AuditComplianceControl';
import AIFinancialInsights from '@/components/ai-agent/dashboard/finance-accounting/AIFinancialInsights';
import RealTimeAccountingOperations from '@/components/ai-agent/dashboard/finance-accounting/RealTimeAccountingOperations';
import FinanceSystemHealth from '@/components/ai-agent/dashboard/finance-accounting/FinanceSystemHealth';
import FinancialPerformanceOverview from '@/components/ai-agent/dashboard/finance-accounting/FinancialPerformanceOverview';
import AIAgentOverview from '@/components/ai-agent/dashboard/finance-accounting/AIAgentOverview';
import ExecutiveFinancialScorecard from '@/components/ai-agent/dashboard/finance-accounting/ExecutiveFinancialScorecard';
import RevenueExpenseAnalytics from '@/components/ai-agent/dashboard/finance-accounting/RevenueExpenseAnalytics';
import FinancialRiskRadar from '@/components/ai-agent/dashboard/finance-accounting/FinancialRiskRadar';
import TreasuryLiquidityPanel from '@/components/ai-agent/dashboard/finance-accounting/TreasuryLiquidityPanel';
import AICFORecommendationEngine from '@/components/ai-agent/dashboard/finance-accounting/AICFORecommendationEngine';

// Types matching component interfaces
interface FinanceAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  confidenceScore: number;
  financialContribution: string;
  transactionsManaged: number;
  performanceTrend: 'up' | 'stable' | 'down';
  metrics: {
    forecastAccuracy?: number;
    budgetsManaged?: string;
    varianceDetection?: number;
    invoicesProcessed?: number;
    automationRate?: number;
    costSavings?: string;
    journalEntries?: number;
    reconciliations?: number;
    errorRate?: number;
  };
}

export default function FinanceCommandCenter() {
  const { theme } = useTheme();

  // Sample Data
  const financeAgents: FinanceAgent[] = [
    {
      id: 'agent-atlas',
      name: 'Agent Atlas',
      role: 'FP&A Agent',
      avatar: '🤖',
      status: 'online',
      confidenceScore: 96,
      transactionsManaged: 1240,
      financialContribution: '$2.4M',
      performanceTrend: 'up',
      metrics: {
        forecastAccuracy: 96,
        budgetsManaged: '$48M',
        varianceDetection: 98,
      }
    },
    {
      id: 'agent-nova',
      name: 'Agent Nova',
      role: 'Accounts Payable Agent',
      avatar: '🤖',
      status: 'online',
      confidenceScore: 94,
      transactionsManaged: 12842,
      financialContribution: '$820K',
      performanceTrend: 'up',
      metrics: {
        invoicesProcessed: 12842,
        automationRate: 94,
        costSavings: '$820K',
      }
    },
    {
      id: 'agent-ledger',
      name: 'Agent Ledger',
      role: 'Accounting Agent',
      avatar: '🤖',
      status: 'online',
      confidenceScore: 98,
      transactionsManaged: 28400,
      financialContribution: '$1.2M',
      performanceTrend: 'up',
      metrics: {
        journalEntries: 28400,
        reconciliations: 3820,
        errorRate: 0.2,
      }
    }
  ];

  // Prepare data for components
  const executiveKPIs = [
    { label: 'Revenue', value: '$124.8M', change: '+12.4%', trend: 'up' as const, color: '#10B981' },
    { label: 'Gross Profit', value: '$67.2M', change: '+8.7%', trend: 'up' as const, color: '#10B981' },
    { label: 'Net Profit', value: '$28.4M', change: '+15.2%', trend: 'up' as const, color: '#10B981' },
    { label: 'EBITDA', value: '$34.8M', change: '+11.3%', trend: 'up' as const, color: '#10B981' },
    { label: 'Cash Balance', value: '$18.6M', change: '+5.8%', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Operating Margin', value: '24.3%', change: '+2.1%', trend: 'up' as const, color: '#10B981' },
    { label: 'Burn Rate', value: '$420K', change: '-8.3%', trend: 'down' as const, color: '#10B981' },
    { label: 'Accounts Receivable', value: '$12.4M', change: '-3.2%', trend: 'down' as const, color: '#10B981' },
    { label: 'Accounts Payable', value: '$8.2M', change: '+2.1%', trend: 'up' as const, color: '#F59E0B' },
    { label: 'Forecast Accuracy', value: '96.2%', change: '+1.8%', trend: 'up' as const, color: '#10B981' },
  ];

  const cfoMetrics = {
    totalRevenue: '$124.8M',
    netProfit: '$28.4M',
    cashPosition: '$18.6M',
    operatingExpenses: '$7.2M',
    forecastedRevenue: '$148M',
    revenueGrowth: 12.4,
    profitMargin: 22.7,
    operatingMargin: 24.3,
  };

  const insights = [
    {
      id: 'insight-1',
      type: 'warning' as const,
      title: 'Marketing spend exceeds budget by 12%',
      description: 'Current marketing spend is $268.8M against a $240M budget. Recommend reviewing campaign effectiveness.',
      impact: 'high' as const,
      action: 'Review marketing campaign effectiveness',
      category: 'Cost'
    },
    {
      id: 'insight-2',
      type: 'risk' as const,
      title: 'Cash flow risk predicted in 45 days',
      description: 'Based on current burn rate and projected inflows, liquidity may tighten. Consider accelerating collections.',
      impact: 'high' as const,
      action: 'Accelerate collections from enterprise accounts',
      category: 'Cash Flow'
    },
    {
      id: 'insight-3',
      type: 'opportunity' as const,
      title: 'Vendor consolidation could save $420K annually',
      description: 'Analysis shows 3 vendors with overlapping services. Consolidation could yield significant savings.',
      impact: 'medium' as const,
      action: 'Initiate vendor consolidation review',
      category: 'Cost'
    },
    {
      id: 'insight-4',
      type: 'opportunity' as const,
      title: 'Revenue forecast increased by 8%',
      description: 'AI forecasting models predict stronger Q4 performance based on pipeline and market indicators.',
      impact: 'high' as const,
      action: 'Monitor pipeline conversion rates',
      category: 'Revenue'
    },
    {
      id: 'insight-5',
      type: 'alert' as const,
      title: 'Collection delays detected in enterprise accounts',
      description: '18 enterprise accounts are overdue. Prioritize outreach to top 5 accounts representing 60% of overdue amount.',
      impact: 'medium' as const,
      action: 'Prioritize outreach to top 5 overdue accounts',
      category: 'Cash Flow'
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#1A1F2E', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Sparkles size={28} color="#10B981" />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>
                AI Finance & Accounting Command Center
              </Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>
                Autonomous Financial Operations
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <RefreshCw size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Bell size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Settings size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Executive KPI Bar */}
      <ExecutiveKPIBar kpis={executiveKPIs} />

      {/* Executive Financial Scorecard */}
      <ExecutiveFinancialScorecard 
        metrics={{
          revenue: { label: 'Revenue', value: '$124.8M', change: '+12.4%', trend: 'up' as const, color: '#F59E0B', icon: <DollarSign size={18} color="#F59E0B" /> },
          profit: { label: 'Net Profit', value: '$28.4M', change: '+15.2%', trend: 'up' as const, color: '#10B981', icon: <TrendingUp size={18} color="#10B981" /> },
          cash: { label: 'Cash Position', value: '$18.6M', change: '+5.8%', trend: 'up' as const, color: '#3B82F6', icon: <Activity size={18} color="#3B82F6" /> },
          growth: { label: 'Revenue Growth', value: '+12.4%', change: '+2.1%', trend: 'up' as const, color: '#06B6D4', icon: <BarChart3 size={18} color="#06B6D4" /> },
          efficiency: { label: 'Op Margin', value: '24.3%', change: '+2.1%', trend: 'up' as const, color: '#8B5CF6', icon: <Target size={18} color="#8B5CF6" /> },
          forecast: { label: 'Forecast Acc', value: '96.2%', change: '+1.8%', trend: 'up' as const, color: '#EC4899', icon: <Activity size={18} color="#EC4899" /> },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* AI Finance Agents Section */}
        <AIAgentOverview agents={financeAgents} />

        {/* CFO Command Center */}
        <CFOCommandCenter metrics={cfoMetrics} />

        {/* Financial Performance Overview */}
        <FinancialPerformanceOverview 
          metrics={{
            revenueGrowth: { label: 'Revenue Growth', value: '+12.4%', change: '+2.1%', trend: 'up' as const, color: '#10B981' },
            grossMargin: { label: 'Gross Margin', value: '53.8%', change: '+0.5%', trend: 'up' as const, color: '#10B981' },
            netMargin: { label: 'Net Margin', value: '22.7%', change: '+1.2%', trend: 'up' as const, color: '#10B981' },
            ebitda: { label: 'EBITDA', value: '$34.8M', change: '+11.3%', trend: 'up' as const, color: '#10B981' },
            costOfGoodsSold: { label: 'COGS', value: '$57.6M', change: '+8.2%', trend: 'down' as const, color: '#EF4444' },
            operatingExpenses: { label: 'OpEx', value: '$7.2M', change: '-3.2%', trend: 'down' as const, color: '#10B981' },
          }}
        />

        {/* Revenue vs Expense Neural Analytics */}
        <RevenueExpenseAnalytics 
          data={[
            { month: 'Jan', revenue: 10200000, expenses: 5800000, profit: 4400000 },
            { month: 'Feb', revenue: 10800000, expenses: 6200000, profit: 4600000 },
            { month: 'Mar', revenue: 11400000, expenses: 6400000, profit: 5000000 },
            { month: 'Apr', revenue: 12000000, expenses: 6600000, profit: 5400000 },
            { month: 'May', revenue: 12600000, expenses: 6800000, profit: 5800000 },
            { month: 'Jun', revenue: 13200000, expenses: 7000000, profit: 6200000 },
          ]}
          currentRevenue={124800000}
          currentExpenses={72000000}
          revenueGrowth={12.4}
          expenseGrowth={8.3}
        />

        {/* Financial Risk Radar */}
        <FinancialRiskRadar 
          risks={[
            { category: 'Financial', level: 'medium' as const, score: 45, trend: 'stable' as const },
            { category: 'Operational', level: 'low' as const, score: 25, trend: 'improving' as const },
            { category: 'Regulatory', level: 'low' as const, score: 30, trend: 'stable' as const },
            { category: 'Market', level: 'medium' as const, score: 55, trend: 'deteriorating' as const },
            { category: 'Liquidity', level: 'low' as const, score: 35, trend: 'improving' as const },
            { category: 'Credit', level: 'low' as const, score: 20, trend: 'stable' as const },
          ]}
          overallRiskLevel="medium"
          riskScore={42}
        />

        {/* Treasury & Liquidity Command Panel */}
        <TreasuryLiquidityPanel 
          cashPosition="$18.6M"
          freeCashFlow="$2.14M"
          runway="14 months"
          liquidityRatio={2.4}
          burnRate="$420K"
          workingCapital="$12.4M"
          cashReserves="$4.2M"
          metrics={[]}
        />

        {/* Accounts Receivable Center */}
        <AccountsReceivableCenter 
          metrics={{
            outstandingInvoices: '234',
            collectionRate: 87.3,
            dso: 42,
            overdueAccounts: 18,
            agingBuckets: [
              { period: '0-30', amount: '$890K', count: 156, percentage: 38 },
              { period: '31-60', amount: '$234K', count: 45, percentage: 10 },
              { period: '61-90', amount: '$89K', count: 18, percentage: 4 },
              { period: '90+', amount: '$57K', count: 15, percentage: 2 },
            ],
          }}
        />

        {/* Accounts Payable Center */}
        <AccountsPayableCenter 
          metrics={{
            pendingPayments: '156',
            invoicesProcessed: 98.4,
            vendorBalances: '$8.2M',
            earlyPaymentDiscounts: '$124K',
            agingBuckets: [
              { period: '0-30', amount: '$3.2M', count: 89, percentage: 39 },
              { period: '31-60', amount: '$2.8M', count: 42, percentage: 34 },
              { period: '61-90', amount: '$1.5M', count: 18, percentage: 18 },
              { period: '90+', amount: '$700K', count: 7, percentage: 9 },
            ],
          }}
        />

        {/* Budget vs Actual Analytics */}
        <BudgetVsActualAnalytics 
          departments={[
            { department: 'Marketing', budget: '$2.4M', actual: '$2.688M', variance: 12, utilization: 112 },
            { department: 'Engineering', budget: '$4.8M', actual: '$4.56M', variance: -5, utilization: 95 },
            { department: 'Sales', budget: '$3.2M', actual: '$3.04M', variance: -5, utilization: 95 },
            { department: 'Operations', budget: '$1.8M', actual: '$1.89M', variance: 5, utilization: 105 },
            { department: 'HR', budget: '$1.2M', actual: '$1.14M', variance: -5, utilization: 95 },
          ]}
          totalBudget="$13.4M"
          totalActual="$13.318M"
          totalVariance={-0.6}
        />

        {/* Financial Forecasting Engine */}
        <FinancialForecastingEngine 
          currentRevenue={124800000}
          currentExpenses={72000000}
          currentProfit={28000000}
          forecastAccuracy={96}
          scenarios={[
            { name: 'Best Case', revenue: 168000000, expenses: 98000000, profit: 70000000, confidence: 75 },
            { name: 'Expected Case', revenue: 148000000, expenses: 108000000, profit: 40000000, confidence: 85 },
            { name: 'Worst Case', revenue: 128000000, expenses: 118000000, profit: 10000000, confidence: 70 },
          ]}
          monthlyForecast={[
            { month: 'Jan', revenue: 10200000, expenses: 5800000, profit: 4400000 },
            { month: 'Feb', revenue: 10800000, expenses: 6200000, profit: 4600000 },
            { month: 'Mar', revenue: 11400000, expenses: 6400000, profit: 5000000 },
            { month: 'Apr', revenue: 12000000, expenses: 6600000, profit: 5400000 },
            { month: 'May', revenue: 12600000, expenses: 6800000, profit: 5800000 },
            { month: 'Jun', revenue: 13200000, expenses: 7000000, profit: 6200000 },
          ]}
        />

        {/* Expense Management Center */}
        <ExpenseManagementCenter 
          totalExpenses="$1.8M"
          expenseCategories={[
            { category: 'Payroll', amount: '$720K', percentage: 40, trend: 'stable' as const, icon: null },
            { category: 'Travel', amount: '$240K', percentage: 13, trend: 'up' as const, icon: null },
            { category: 'Software', amount: '$180K', percentage: 10, trend: 'down' as const, icon: null },
            { category: 'Office', amount: '$120K', percentage: 7, trend: 'stable' as const, icon: null },
          ]}
          departmentExpenses={[
            { department: 'Engineering', amount: '$540K', budget: '$560K', variance: -3.6 },
            { department: 'Marketing', amount: '$480K', budget: '$480K', variance: 0 },
            { department: 'Sales', amount: '$360K', budget: '$380K', variance: -5.3 },
            { department: 'Operations', amount: '$240K', budget: '$240K', variance: 0 },
          ]}
          optimizationOpportunities="$420K"
        />

        {/* Audit & Compliance Control */}
        <AuditComplianceControl 
          complianceScore={94}
          auditReadiness={98}
          metrics={[
            { label: 'Internal Controls', value: '94.2%', status: 'compliant' as const, trend: 'up' as const },
            { label: 'Financial Reporting', value: '99.1%', status: 'compliant' as const, trend: 'stable' as const },
            { label: 'Tax Compliance', value: '97.8%', status: 'compliant' as const, trend: 'up' as const },
          ]}
          auditItems={[
            { id: '1', title: 'Q3 Tax Filing', status: 'pending' as const, priority: 'high' as const, dueDate: 'In 15 days' },
            { id: '2', title: 'SOX 404 Assessment', status: 'in-progress' as const, priority: 'high' as const, dueDate: 'In 30 days' },
            { id: '3', title: 'GDPR Review', status: 'pending' as const, priority: 'medium' as const, dueDate: 'In 60 days' },
          ]}
          riskFactors={[
            { category: 'Financial', level: 'medium' as const, score: 45 },
            { category: 'Operational', level: 'low' as const, score: 25 },
            { category: 'Regulatory', level: 'low' as const, score: 30 },
          ]}
        />

        {/* AI CFO Recommendation Engine */}
        <AICFORecommendationEngine 
          recommendations={[
            {
              id: 'rec-1',
              type: 'opportunity' as const,
              title: 'Vendor consolidation could save $420K annually',
              description: 'Analysis shows 3 vendors with overlapping services. Consolidation could yield significant savings while maintaining service quality.',
              impact: 'high' as const,
              category: 'Cost Optimization',
              action: 'Initiate Review',
              priority: 95,
              estimatedValue: '$420K'
            },
            {
              id: 'rec-2',
              type: 'risk' as const,
              title: 'Cash flow risk predicted in 45 days',
              description: 'Based on current burn rate and projected inflows, liquidity may tighten. Consider accelerating collections from enterprise accounts.',
              impact: 'high' as const,
              category: 'Cash Flow',
              action: 'Accelerate Collections',
              priority: 90
            },
            {
              id: 'rec-3',
              type: 'warning' as const,
              title: 'Marketing spend exceeds budget by 12%',
              description: 'Current marketing spend is $2.688M against a $2.4M budget. Recommend reviewing campaign effectiveness and ROI.',
              impact: 'medium' as const,
              category: 'Budget Control',
              action: 'Review Campaigns',
              priority: 85
            },
            {
              id: 'rec-4',
              type: 'opportunity' as const,
              title: 'Revenue forecast increased by 8%',
              description: 'AI forecasting models predict stronger Q4 performance based on pipeline and market indicators. Consider resource allocation.',
              impact: 'high' as const,
              category: 'Revenue Growth',
              action: 'Allocate Resources',
              priority: 88,
              estimatedValue: '$9.9M'
            },
            {
              id: 'rec-5',
              type: 'action' as const,
              title: 'Collection delays detected in enterprise accounts',
              description: '18 enterprise accounts are overdue. Prioritize outreach to top 5 accounts representing 60% of overdue amount.',
              impact: 'medium' as const,
              category: 'Accounts Receivable',
              action: 'Prioritize Outreach',
              priority: 82
            },
          ]}
        />

        {/* AI Financial Insights */}
        <AIFinancialInsights insights={insights} />

        {/* Real-Time Accounting Operations */}
        <RealTimeAccountingOperations 
          operations={[
            { id: 'op-1', type: 'invoice' as const, title: 'Invoice Received', description: 'Invoice received from TechCorp Inc', amount: '$45,000', timestamp: '2m ago', status: 'completed' as const, agent: 'Agent Nova' },
            { id: 'op-2', type: 'payment' as const, title: 'Payment Processed', description: 'Payment processed to GlobalSoft', amount: '$45,000', timestamp: '5m ago', status: 'completed' as const, agent: 'Agent Nova' },
            { id: 'op-3', type: 'journal' as const, title: 'Journal Entry', description: 'Journal entry created for monthly depreciation', timestamp: '8m ago', status: 'completed' as const, agent: 'Agent Ledger' },
            { id: 'op-4', type: 'budget' as const, title: 'Budget Approved', description: 'Budget approved for Q4 marketing campaign', timestamp: '12m ago', status: 'completed' as const, agent: 'Agent Atlas' },
            { id: 'op-5', type: 'forecast' as const, title: 'Forecast Updated', description: 'Forecast updated with latest pipeline data', timestamp: '15m ago', status: 'completed' as const, agent: 'Agent Atlas' },
            { id: 'op-6', type: 'audit' as const, title: 'Audit Flag', description: 'Audit flag triggered for unusual expense pattern', timestamp: '18m ago', status: 'processing' as const, agent: 'Agent Ledger' },
          ]}
        />

        {/* Finance System Health */}
        <FinanceSystemHealth 
          systems={[
            { name: 'ERP Systems', status: 'healthy' as const, uptime: '99.9%', latency: 12, lastSync: '2m ago' },
            { name: 'Accounting Platform', status: 'healthy' as const, uptime: '99.8%', latency: 12, lastSync: '1m ago' },
            { name: 'Banking Integrations', status: 'healthy' as const, uptime: '100%', latency: 45, lastSync: '5m ago' },
            { name: 'AI Agent Health', status: 'healthy' as const, uptime: '100%', latency: 8, lastSync: '30s ago' },
          ]}
          overallHealth="healthy"
          apiConnectivity={99}
          dataQuality={98}
          agentHealth={100}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});