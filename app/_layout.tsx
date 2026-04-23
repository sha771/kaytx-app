/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

// Import global polyfills FIRST - must be before any other imports
import "@/lib/global-polyfills";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRootNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
// import { StyleSheet } from "react-native"; // Removed for web compatibility
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProviders } from "@/providers/AppProviders";
import { trpc, trpcClient } from "@/lib/trpc";
import { ErrorBoundary } from "@/components/ErrorBoundary";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" options={{ presentation: "modal" }} />
      <Stack.Screen name="add-service" options={{ presentation: "modal" }} />
      <Stack.Screen name="profile" options={{ presentation: "modal" }} />
      <Stack.Screen name="enterprise-dashboard" options={{ presentation: "modal" }} />
      <Stack.Screen name="enterprise-admin" options={{ presentation: "modal" }} />
      <Stack.Screen name="enterprise/reporting" />
      <Stack.Screen name="enterprise/compliance" />
      <Stack.Screen name="enterprise/api-management" />
      <Stack.Screen name="enterprise/security" />
      <Stack.Screen name="enterprise/infrastructure" />
      <Stack.Screen name="enterprise/cicd" />
      <Stack.Screen name="enterprise/networking" />
      <Stack.Screen name="enterprise/organization" />
      <Stack.Screen name="enterprise/backup" />
      <Stack.Screen name="enterprise/billing" />
      <Stack.Screen name="enterprise/cdn" />
      <Stack.Screen name="enterprise/containers" />
      <Stack.Screen name="enterprise/database" />
      <Stack.Screen name="enterprise/monitoring" />
      <Stack.Screen name="enterprise/servers" />
      <Stack.Screen name="security-privacy" options={{ presentation: "modal" }} />
      <Stack.Screen name="notification" options={{ presentation: "modal" }} />
      <Stack.Screen name="archive" options={{ presentation: "modal" }} />
      <Stack.Screen name="support" options={{ presentation: "modal" }} />
      <Stack.Screen name="communications/chats-messaging" />
      <Stack.Screen name="communications/unified-inbox" />
      <Stack.Screen name="communications/phone-call" />
      <Stack.Screen name="communications/sms-text" />
      <Stack.Screen name="communications/email" />
      <Stack.Screen name="communications/social-media" />
      <Stack.Screen name="communications/instant-chats" />
      <Stack.Screen name="communications/voice-call" />
      <Stack.Screen name="communications/video-call" />
      <Stack.Screen name="communications/meeting" />
      <Stack.Screen name="communications/conference" />
      <Stack.Screen name="communications/contact-center" />
      <Stack.Screen name="communications/team-communication" />
      <Stack.Screen name="communications/message-scheduling" />
      <Stack.Screen name="communications/call-center" />
      <Stack.Screen name="communications/sim" />
      <Stack.Screen name="communications/text-voice-survey" />
      <Stack.Screen name="communications/video-interview-survey" />
      <Stack.Screen name="communications/customer-feedback" />
      <Stack.Screen name="ai-agent/index" />
      <Stack.Screen name="ai-agent/employees" />
      <Stack.Screen name="ai-agent/accounting/index" />
      <Stack.Screen name="ai-agent/engineering/index" />
      <Stack.Screen name="ai-agent/hr/index" />
      <Stack.Screen name="ai-agent/marketing/index" />
      <Stack.Screen name="ai-agent/sales/index" />
      <Stack.Screen name="ai-agent/operations/index" />
      <Stack.Screen name="ai-agent/legal/index" />
      <Stack.Screen name="ai-agent/it/index" />
      <Stack.Screen name="ai-agent/data/index" />
      <Stack.Screen name="ai-agent/product/index" />
      <Stack.Screen name="ai-agent/social-media/index" />
      <Stack.Screen name="ai-agent/customer/index" />
      <Stack.Screen name="ai-agent/analysis/index" />
      <Stack.Screen name="ai-agent/performance/index" />
      {/* Accounting Department AI Agents */}
      <Stack.Screen name="ai-agent/accounting/auditor" />
      <Stack.Screen name="ai-agent/accounting/bookkeeper" />
      <Stack.Screen name="ai-agent/accounting/expense-manager" />
      <Stack.Screen name="ai-agent/accounting/financial-planner" />
      <Stack.Screen name="ai-agent/accounting/invoice-processor" />
      <Stack.Screen name="ai-agent/accounting/payroll-manager" />
      <Stack.Screen name="ai-agent/accounting/tax-analyst" />
      {/* Engineering Department AI Agents */}
      <Stack.Screen name="ai-agent/engineering/architecture-advisor" />
      <Stack.Screen name="ai-agent/engineering/bug-triager" />
      <Stack.Screen name="ai-agent/engineering/cicd-agent" />
      <Stack.Screen name="ai-agent/engineering/code-reviewer" />
      <Stack.Screen name="ai-agent/engineering/documentation-agent" />
      <Stack.Screen name="ai-agent/engineering/sprint-manager" />
      <Stack.Screen name="ai-agent/engineering/test-automation" />
      {/* HR Department AI Agents */}
      <Stack.Screen name="ai-agent/hr/benefits-manager" />
      <Stack.Screen name="ai-agent/hr/culture-agent" />
      <Stack.Screen name="ai-agent/hr/hr-compliance" />
      <Stack.Screen name="ai-agent/hr/onboarding-agent" />
      <Stack.Screen name="ai-agent/hr/performance-reviewer" />
      <Stack.Screen name="ai-agent/hr/recruiter" />
      <Stack.Screen name="ai-agent/hr/training-coordinator" />
      {/* IT Department AI Agents */}
      <Stack.Screen name="ai-agent/it/cloud-architect" />
      <Stack.Screen name="ai-agent/it/devops-agent" />
      <Stack.Screen name="ai-agent/it/help-desk" />
      <Stack.Screen name="ai-agent/it/infrastructure-manager" />
      <Stack.Screen name="ai-agent/it/network-monitor" />
      <Stack.Screen name="ai-agent/it/security-analyst" />
      {/* Legal Department AI Agents */}
      <Stack.Screen name="ai-agent/legal/compliance-monitor" />
      <Stack.Screen name="ai-agent/legal/contract-reviewer" />
      <Stack.Screen name="ai-agent/legal/legal-researcher" />
      <Stack.Screen name="ai-agent/legal/policy-analyst" />
      <Stack.Screen name="ai-agent/legal/regulatory-agent" />
      <Stack.Screen name="ai-agent/legal/risk-assessor" />
      {/* Data Department AI Agents */}
      <Stack.Screen name="ai-agent/data/competitive-analyst" />
      <Stack.Screen name="ai-agent/data/customer-insights" />
      <Stack.Screen name="ai-agent/data/data-analyst" />
      <Stack.Screen name="ai-agent/data/financial-analyst" />
      <Stack.Screen name="ai-agent/data/forecasting-agent" />
      <Stack.Screen name="ai-agent/data/fraud-detection" />
      <Stack.Screen name="ai-agent/data/risk-analyst" />
      <Stack.Screen name="ai-agent/data/sales-data-analyst" />
      {/* Product Department AI Agents */}
      <Stack.Screen name="ai-agent/product/ab-test-agent" />
      <Stack.Screen name="ai-agent/product/feature-analyst" />
      <Stack.Screen name="ai-agent/product/prototype-builder" />
      <Stack.Screen name="ai-agent/product/roadmap-planner" />
      <Stack.Screen name="ai-agent/product/ux-researcher" />
      {/* Operations Department AI Agents */}
      <Stack.Screen name="ai-agent/operations/compliance-monitoring" />
      <Stack.Screen name="ai-agent/operations/operations-manager" />
      <Stack.Screen name="ai-agent/operations/process-optimization" />
      <Stack.Screen name="ai-agent/operations/quality-control" />
      <Stack.Screen name="ai-agent/operations/resource-planner" />
      <Stack.Screen name="ai-agent/operations/task-coordinator" />
      <Stack.Screen name="ai-agent/operations/vendor-management" />
      <Stack.Screen name="ai-agent/operations/workflow-automation" />
      {/* Performance Department AI Agents */}
      <Stack.Screen name="ai-agent/performance/business-intelligence" />
      <Stack.Screen name="ai-agent/performance/customer-behavior-analysis" />
      <Stack.Screen name="ai-agent/performance/executive-intelligence" />
      <Stack.Screen name="ai-agent/performance/goal-tracking" />
      <Stack.Screen name="ai-agent/performance/insight-generation" />
      <Stack.Screen name="ai-agent/performance/market-insights" />
      <Stack.Screen name="ai-agent/performance/performance-monitoring" />
      <Stack.Screen name="ai-agent/performance/predictive-analytics" />
      <Stack.Screen name="ai-agent/performance/roi-analysis" />
      {/* Social Media Department AI Agents */}
      <Stack.Screen name="ai-agent/social-media/brand-monitor" />
      <Stack.Screen name="ai-agent/social-media/community-manager" />
      <Stack.Screen name="ai-agent/social-media/content-creator" />
      <Stack.Screen name="ai-agent/social-media/engagement-optimizer" />
      <Stack.Screen name="ai-agent/social-media/influencer-outreach" />
      <Stack.Screen name="ai-agent/social-media/post-scheduler" />
      <Stack.Screen name="ai-agent/social-media/social-ad-manager" />
      <Stack.Screen name="ai-agent/social-media/social-analytics" />
      <Stack.Screen name="ai-agent/executive/ceo-advisor" />
      <Stack.Screen name="ai-agent/executive/cfo-analyst" />
      <Stack.Screen name="ai-agent/executive/coo-strategist" />
      <Stack.Screen name="ai-agent/executive/cto-advisor" />
      <Stack.Screen name="ai-agent/executive/cmo-advisor" />
      <Stack.Screen name="ai-agent/executive/cco-advisor" />
      <Stack.Screen name="ai-agent/executive/chro-advisor" />
      <Stack.Screen name="ai-agent/executive/clo-advisor" />
      <Stack.Screen name="ai-agent/executive/ciso-advisor" />
      <Stack.Screen name="ai-agent/executive/cio-advisor" />
      <Stack.Screen name="ai-agent/executive/cdao-advisor" />
      <Stack.Screen name="ai-agent/executive/cao-automation" />
      <Stack.Screen name="ai-agent/executive/creo-advisor" />
      <Stack.Screen name="ai-agent/executive/cro-risk" />
      <Stack.Screen name="ai-agent/executive/cmo-healthcare" />
      <Stack.Screen name="ai-agent/executive/cpo-production" />
      <Stack.Screen name="ai-agent/executive/clo-logistics" />
      <Stack.Screen name="ai-agent/executive/board-advisor" />
      <Stack.Screen name="ai-agent/executive/strategy-planner" />
      <Stack.Screen name="ai-agent/executive/decision-engine" />
      <Stack.Screen name="ai-agent/ai-agent" />
      <Stack.Screen name="ai-agent/ai-receptionist" />
      <Stack.Screen name="ai-agents-employees-builder" />
      <Stack.Screen name="command-center" options={{ presentation: "fullScreenModal" }} />
      <Stack.Screen name="ai-agent/personal-assistant" />
      <Stack.Screen name="ai-agent/ai-voice-assistant" />
      <Stack.Screen name="ai-agent/ai-workflow" />
      <Stack.Screen name="ai-agent/ai-data-analytics" />
      <Stack.Screen name="ai-agent/ai-negotiation-assistant" />
      <Stack.Screen name="ai-agent/negotiation-config" />
      <Stack.Screen name="ai-agent/receptionist-config" />
      <Stack.Screen name="ai-agent/call-summary-note" />
      <Stack.Screen name="ai-agent/smart-task-automation" />
      <Stack.Screen name="automation/automation-hub" />
      <Stack.Screen name="automation/marketing-automation" />
      <Stack.Screen name="automation/lead-generation" />
      <Stack.Screen name="automation/scheduling-calendar" />
      <Stack.Screen name="automation/time-management" />
      <Stack.Screen name="automation/workflow-management" />
      <Stack.Screen name="automation/task-management" />
      <Stack.Screen name="automation/task-assignment" />
      <Stack.Screen name="automation/team-performance" />
      <Stack.Screen name="automation/workflow-builder" />
      <Stack.Screen name="automation/integrations" />
      <Stack.Screen name="business/crm" />
      <Stack.Screen name="business/customer-management" />
      <Stack.Screen name="business/business-analysis" />
      <Stack.Screen name="business/customer-support" />
      <Stack.Screen name="business/cohort-analysis" />
      <Stack.Screen name="business/sales-management" />
      <Stack.Screen name="business/sales-pipeline" />
      <Stack.Screen name="business/revenue-tracking" />
      <Stack.Screen name="business/roi-analysis" />
      <Stack.Screen name="business/crm-integration" />
      <Stack.Screen name="collaboration/team-collaboration" />
      <Stack.Screen name="collaboration/team-management" />
      <Stack.Screen name="collaboration/project-management" />
      <Stack.Screen name="collaboration/file-sharing" />
      <Stack.Screen name="collaboration/event-calendar" />
      <Stack.Screen name="analytics/analytics-performance" />
      <Stack.Screen name="analytics/reports-insights" />
      <Stack.Screen name="analytics/data-visualization" />
      <Stack.Screen name="analytics/best-time-analysis" />
      <Stack.Screen name="analytics/ab-testing" />
      <Stack.Screen name="analytics/advance-analytics" />
      <Stack.Screen name="marketing/marketing-hub" />
      <Stack.Screen name="marketing/email-marketing" />
      <Stack.Screen name="marketing/email-marketing-hub" />
      <Stack.Screen name="marketing/sms-marketing-hub" />
      <Stack.Screen name="marketing/advance-marketing" />
      <Stack.Screen name="marketing/content-creation" />
      <Stack.Screen name="marketing/social-media-management" />
      <Stack.Screen name="marketing/advertising" />
      <Stack.Screen name="marketing/campaign" />
      <Stack.Screen name="marketing/ads-manager" />
      <Stack.Screen name="marketing/seo-optimization" />
      <Stack.Screen name="marketing/growth-optimization" />
      <Stack.Screen name="marketing/llmo" />
      <Stack.Screen name="marketing/marketing-automation" />
      <Stack.Screen name="marketing/marketing-analysis-insights" />
      <Stack.Screen name="automation/sales-automation" />
      <Stack.Screen name="ai-negotiation/dashboard" />
      <Stack.Screen name="ai-negotiation/phone-numbers" />
      <Stack.Screen name="ai-negotiation/calls" />
      <Stack.Screen name="ai-negotiation/call-logs" />
      <Stack.Screen name="ai-negotiation/training" />
      <Stack.Screen name="ai-negotiation/transcripts" />
      <Stack.Screen name="ai-negotiation/analytics" />
      <Stack.Screen name="ai-negotiation/appointments" />
      <Stack.Screen name="ai-negotiation/scripts" />
      <Stack.Screen name="ai-negotiation/crm" />
      <Stack.Screen name="ai-negotiation/deals" />
      <Stack.Screen name="ai-negotiation/templates" />
      <Stack.Screen name="ai-negotiation/integrations" />
      <Stack.Screen name="ai-negotiation/notifications" />
      <Stack.Screen name="ai-negotiation/setup" />
      <Stack.Screen name="ai-negotiation/caller-insights" />
      <Stack.Screen name="ai-negotiation/call-scripts" />
      <Stack.Screen name="ai-negotiation/assistant" />
      <Stack.Screen name="ai-negotiation/competitor-analysis" />
      <Stack.Screen name="ai-negotiation/deal-scoring" />
      <Stack.Screen name="ai-negotiation/objection-handling" />
      <Stack.Screen name="ai-negotiation/proposal-builder" />
      <Stack.Screen name="ai-negotiation/summary-notes" />
      <Stack.Screen name="ai-negotiation/voice-settings" />
      <Stack.Screen name="ai-receptionist/dashboard" />
      <Stack.Screen name="ai-receptionist/phone-numbers" />
      <Stack.Screen name="ai-receptionist/call-logs" />
      <Stack.Screen name="ai-receptionist/contacts" />
      <Stack.Screen name="ai-receptionist/training" />
      <Stack.Screen name="ai-receptionist/caller-insights" />
      <Stack.Screen name="ai-receptionist/call-scripts" />
      <Stack.Screen name="ai-receptionist/integrations" />
      <Stack.Screen name="ai-receptionist/analytics" />
      <Stack.Screen name="ai-receptionist/appointments" />
      <Stack.Screen name="ai-receptionist/notifications" />
      <Stack.Screen name="ai-receptionist/setup" />
      <Stack.Screen name="ai-receptionist/assistant" />
      <Stack.Screen name="ai-receptionist/call-queue" />
      <Stack.Screen name="ai-receptionist/call-routing" />
      <Stack.Screen name="ai-receptionist/callback-system" />
      <Stack.Screen name="ai-receptionist/ivr-builder" />
      <Stack.Screen name="ai-receptionist/summary-notes" />
      <Stack.Screen name="ai-receptionist/voice-settings" />
      <Stack.Screen name="ai-receptionist/voicemail" />
      <Stack.Screen name="ai-receptionist/transcripts" />
      <Stack.Screen name="marketing/cold-calling" />
      <Stack.Screen name="marketing/cold-email" />
      <Stack.Screen name="ai-assistant/emails" />
      <Stack.Screen name="ai-assistant/calendar" />
      {/* Social Media Platform Routes */}
      <Stack.Screen name="social-media/ai-content" />
      <Stack.Screen name="social-media/analytics" />
      <Stack.Screen name="social-media/audience-insights" />
      <Stack.Screen name="social-media/brand-monitoring" />
      <Stack.Screen name="social-media/competitor-analysis" />
      <Stack.Screen name="social-media/content-calendar" />
      <Stack.Screen name="social-media/content-library" />
      <Stack.Screen name="social-media/cross-platform" />
      <Stack.Screen name="social-media/dashboard" />
      <Stack.Screen name="social-media/engagement" />
      <Stack.Screen name="social-media/hashtags" />
      <Stack.Screen name="social-media/influencer-tracking" />
      <Stack.Screen name="social-media/multi-account" />
      <Stack.Screen name="social-media/post-scheduler" />
      <Stack.Screen name="social-media/reports" />
      <Stack.Screen name="social-media/social-inbox" />
      <Stack.Screen name="social-media/social-listening" />
      <Stack.Screen name="social-media/stories-reels" />
      {/* Marketing Routes - Additional */}
      <Stack.Screen name="marketing/attribution" />
      <Stack.Screen name="marketing/influencer-crm" />
      <Stack.Screen name="marketing/influencer-marketing" />
      <Stack.Screen name="marketing/landing-pages" />
      {/* Business Routes - Additional */}
      <Stack.Screen name="business/customer-insights" />
      <Stack.Screen name="business/customer-segmentation" />
      <Stack.Screen name="business/lead-management" />
      <Stack.Screen name="business/workflow-automation" />
      {/* Collaboration Routes - Additional */}
      <Stack.Screen name="collaboration/knowledge-base" />
      <Stack.Screen name="collaboration/resource-planning" />
      {/* Analytics Routes - Additional */}
      <Stack.Screen name="analytics/predictive-forecasting" />
      <Stack.Screen name="analytics/predictive-metrics" />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="auth/verify-email" options={{ headerShown: false }} />
      {/* Privacy Routes */}
      <Stack.Screen name="privacy/access-logs" />
      <Stack.Screen name="privacy/breach-monitor" />
      <Stack.Screen name="privacy/consent-management" />
      <Stack.Screen name="privacy/privacy-dashboard" />
      {/* Compliance Routes */}
      <Stack.Screen name="compliance/compliance-dashboard" />
    </Stack>
  );
}

export default function RootLayout() {
  const navigation = useRootNavigation();

  useEffect(() => {
    if (!navigation) return;

    const unsubscribe = navigation.addListener('onReady', () => {
      SplashScreen.hideAsync();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProviders>
              <RootLayoutNav />
            </AppProviders>
          </GestureHandlerRootView>
        </trpc.Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
