import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import DashboardLayout from './DashboardLayout';
import StatGrid from './StatGrid';
import PerformanceChart from './PerformanceChart';
import PipelineView from './PipelineView';
import ActivityFeed from './ActivityFeed';
import CircularProgress from './CircularProgress';
import AIDecisionMatrix from './AIDecisionMatrix';
import RiskEngine from './RiskEngine';
import ExecutionPipeline from './ExecutionPipeline';
import MarketIntelligence from './MarketIntelligence';
import AIPredictionCenter from './AIPredictionCenter';
import SystemHealth from './SystemHealth';
import SalesPipeline from './SalesPipeline';
import LiveDealTracker from './LiveDealTracker';
import LeadIntelligence from './LeadIntelligence';
import RevenueForecast from './RevenueForecast';
import SalesPerformance from './SalesPerformance';
import CustomerIntelligence from './CustomerIntelligence';
import AIInsights from './AIInsights';
import { DepartmentDashboardConfig } from './types';
// Banking & Finance specific components
import AIFinancialAgents from './banking-finance/AIFinancialAgents';
import CFOCommandCenter from './banking-finance/CFOCommandCenter';
import RealTimeTrading from './banking-finance/RealTimeTrading';
import PortfolioManagement from './banking-finance/PortfolioManagement';
import RiskCompliance from './banking-finance/RiskCompliance';
import CreditIntelligence from './banking-finance/CreditIntelligence';
import FraudDetection from './banking-finance/FraudDetection';
import TreasuryLiquidity from './banking-finance/TreasuryLiquidity';
import MarketIntelligenceCenter from './banking-finance/MarketIntelligenceCenter';
import PaymentSettlement from './banking-finance/PaymentSettlement';
import FinancialOperationsFeed from './banking-finance/FinancialOperationsFeed';
import AIFinanceInsights from './banking-finance/AIFinanceInsights';
import SystemHealthFintechInfrastructure from './banking-finance/SystemHealthFintechInfrastructure';
import ExecutiveKPIBar from './banking-finance/ExecutiveKPIBar';
import BankingSidebar from './banking-finance/BankingSidebar';

interface DepartmentDashboardProps {
  config: DepartmentDashboardConfig;
  mode?: string;
  wallet?: string;
  agents?: Array<{
    id: string;
    uid: string;
    title: string;
    route: string;
    color: string;
    level: string;
    efficiency: string;
  }>;
}

export default function DepartmentDashboard({ config, mode, wallet, agents }: DepartmentDashboardProps) {
  const { theme } = useTheme();
  const isBankingFinance = config.departmentName?.toLowerCase().includes('banking') || 
                          config.departmentName?.toLowerCase().includes('finance');

  return (
    <DashboardLayout
      header={{
        departmentName: config.departmentName,
        mode,
        wallet,
      }}
    >
      <View style={styles.mainContainer}>
        {/* Banking & Finance Sidebar */}
        {isBankingFinance && (
          <BankingSidebar />
        )}
        
        <View style={styles.contentContainer}>
          {/* Executive KPI Bar for Banking & Finance */}
          {isBankingFinance && (
            <ExecutiveKPIBar />
          )}
          
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
            {/* Main Metrics Grid */}
            <StatGrid metrics={config.metrics} columns={2} />
        
        {/* Circular Progress for Key Metric */}
        {config.metrics[0] && (
          <View style={styles.circularProgressSection}>
            <CircularProgress
              value={parseFloat(config.metrics[0].value.toString().replace(/[^0-9.-]/g, '')) || 0}
              size={140}
              label={config.metrics[0].title}
              color={config.primaryColor}
            />
          </View>
        )}
        
        {/* Performance Charts */}
        {config.charts?.performance && (
          <View style={styles.chartSection}>
            <PerformanceChart data={config.charts.performance} type="bar" height={180} />
          </View>
        )}
        
        {config.charts?.trend && (
          <View style={styles.chartSection}>
            <PerformanceChart data={config.charts.trend} type="line" height={180} />
          </View>
        )}
        
        {/* Institutional-grade sections */}
        {config.aiDecisionMatrix && (
          <AIDecisionMatrix {...config.aiDecisionMatrix} />
        )}
        
        {config.riskEngine && (
          <RiskEngine {...config.riskEngine} />
        )}
        
        {config.executionPipeline && (
          <ExecutionPipeline {...config.executionPipeline} />
        )}
        
        {config.marketIntelligence && (
          <MarketIntelligence {...config.marketIntelligence} />
        )}
        
        {config.aiPredictionCenter && (
          <AIPredictionCenter {...config.aiPredictionCenter} />
        )}
        
        {config.systemHealth && (
          <SystemHealth {...config.systemHealth} />
        )}
        
        {/* Sales & Revenue specific sections */}
        {config.salesPipeline && (
          <SalesPipeline config={config.salesPipeline} />
        )}
        
        {config.liveDeals && (
          <LiveDealTracker config={config.liveDeals} />
        )}
        
        {config.leadIntelligence && (
          <LeadIntelligence config={config.leadIntelligence} />
        )}
        
        {config.revenueForecast && (
          <RevenueForecast config={config.revenueForecast} />
        )}
        
        {config.salesPerformance && (
          <SalesPerformance config={config.salesPerformance} />
        )}
        
        {config.customerIntelligence && (
          <CustomerIntelligence config={config.customerIntelligence} />
        )}
        
        {config.aiInsights && (
          <AIInsights config={config.aiInsights} />
        )}
        
        {/* Banking & Finance specific sections */}
        {config.aiFinancialAgents && (
          <AIFinancialAgents config={config.aiFinancialAgents} />
        )}
        
        {config.cfoCommandCenter && (
          <CFOCommandCenter config={config.cfoCommandCenter} />
        )}
        
        {config.realTimeTrading && (
          <RealTimeTrading config={config.realTimeTrading} />
        )}
        
        {config.portfolioManagement && (
          <PortfolioManagement config={config.portfolioManagement} />
        )}
        
        {config.riskCompliance && (
          <RiskCompliance config={config.riskCompliance} />
        )}
        
        {config.creditIntelligence && (
          <CreditIntelligence config={config.creditIntelligence} />
        )}
        
        {config.fraudDetection && (
          <FraudDetection config={config.fraudDetection} />
        )}
        
        {config.treasuryLiquidity && (
          <TreasuryLiquidity config={config.treasuryLiquidity} />
        )}
        
        {config.marketIntelligenceCenter && (
          <MarketIntelligenceCenter config={config.marketIntelligenceCenter} />
        )}
        
        {config.paymentSettlement && (
          <PaymentSettlement config={config.paymentSettlement} />
        )}
        
        {config.financialOperationsFeed && (
          <FinancialOperationsFeed config={config.financialOperationsFeed} />
        )}
        
        {config.aiInsights && (
          <AIFinanceInsights config={config.aiInsights} />
        )}
        
        {config.systemHealth && (
          <SystemHealthFintechInfrastructure config={config.systemHealth} />
        )}
        
        {/* Pipeline View */}
        {config.pipeline && config.pipeline.length > 0 && (
          <View style={styles.pipelineSection}>
            <PipelineView steps={config.pipeline} />
          </View>
        )}
        
        {/* Activity Feed */}
        {config.activity && config.activity.length > 0 && (
          <View style={styles.activitySection}>
            <ActivityFeed activities={config.activity} maxItems={5} />
          </View>
        )}

        {/* Agents Section */}
        {agents && agents.length > 0 && (
          <View style={[styles.agentsSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.agentsTitle, { color: theme.colors.text }]}>
              AI Agents ({agents.length})
            </Text>
            <ScrollView style={styles.agentsScroll} showsVerticalScrollIndicator={false}>
              {agents.map((agent) => (
                <View key={agent.id} style={[styles.agentItem, { borderBottomColor: theme.colors.border }]}>
                  <View style={[styles.agentColorIndicator, { backgroundColor: agent.color }]} />
                  <View style={styles.agentInfo}>
                    <Text style={[styles.agentTitle, { color: theme.colors.text }]} numberOfLines={1}>
                      {agent.title}
                    </Text>
                    <Text style={[styles.agentMeta, { color: theme.colors.textSecondary }]}>
                      {agent.level} • {agent.efficiency}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
          </ScrollView>
        </View>
      </View>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  circularProgressSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chartSection: {
    marginTop: 16,
  },
  pipelineSection: {
    marginTop: 16,
  },
  activitySection: {
    marginTop: 16,
  },
  agentsSection: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    maxHeight: 300,
  },
  agentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  agentsScroll: {
    maxHeight: 240,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  agentColorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  agentMeta: {
    fontSize: 11,
  },
});
