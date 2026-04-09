/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
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
    <Stack screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name="ai-agent/ai-agent" />
      <Stack.Screen name="ai-agent/ai-receptionist" />
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
      <Stack.Screen name="marketing/cold-calling" />
      <Stack.Screen name="marketing/cold-email" />
      <Stack.Screen name="ai-assistant/emails" />
      <Stack.Screen name="ai-assistant/calendar" />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

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
