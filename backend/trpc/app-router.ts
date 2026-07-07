import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { getDashboardAnalyticsProcedure as getMetricsRoute } from "./routes/enterprise/analytics/route";
import getCampaignsRoute from "./routes/marketing/get-campaigns/route";
import getCrmDataRoute from "./routes/business/get-crm-data/route";
import getTeamMembersRoute from "./routes/team/get-members/route";
import getNotificationsRoute from "./routes/notifications/get-all/route";
import getSecuritySettingsRoute from "./routes/security/get-settings/route";
import { connectQRProcedure } from "./routes/platforms/connect-qr/route";
import { verifyQRProcedure } from "./routes/platforms/verify-qr/route";
import { connectOAuthProcedure } from "./routes/platforms/connect-oauth/route";
import { connectCredentialsProcedure } from "./routes/platforms/connect-credentials/route";
import { verify2FAProcedure } from "./routes/platforms/verify-2fa/route";
import { disconnectPlatformProcedure } from "./routes/platforms/disconnect/route";
import { syncPlatformProcedure } from "./routes/platforms/sync/route";
import { getAllPlatformsProcedure } from "./routes/platforms/get-all/route";
import { listAllPlatformsProcedure } from "./routes/platforms/list-all/route";
import { searchPlatformsProcedure } from "./routes/platforms/search/route";
import { getNegotiationConfigProcedure } from "./routes/ai-assistant/negotiation/get-config/route";
import { saveNegotiationConfigProcedure } from "./routes/ai-assistant/negotiation/save-config/route";
import { getReceptionistConfigProcedure } from "./routes/ai-assistant/receptionist/get-config/route";
import { saveReceptionistConfigProcedure } from "./routes/ai-assistant/receptionist/save-config/route";
import { getTranscriptsProcedure } from "./routes/ai-assistant/receptionist/get-transcripts";
import { getTrainingFlowsProcedure, getTrainingStatsProcedure } from "./routes/ai-assistant/receptionist/training-data";
import { getVoiceSettingsProcedure, updateVoiceSettingsProcedure } from "./routes/ai-assistant/receptionist/voice-settings";
import { getVoicemailsProcedure, markVoicemailReadProcedure, toggleVoicemailFlagProcedure, deleteVoicemailProcedure } from "./routes/ai-assistant/receptionist/voicemail";
import { getSubscriptionProcedure } from "./routes/enterprise/get-subscription/route";
import { getInvoicesProcedure } from "./routes/enterprise/get-invoices/route";
import { getUsageMetricsProcedure } from "./routes/enterprise/get-usage-metrics/route";
import { getComplianceReportsProcedure, generateComplianceReportProcedure } from "./routes/enterprise/compliance/route";
import { getAuditLogsProcedure, exportAuditLogsProcedure } from "./routes/enterprise/audit-logs/route";
import { getOrganizationProcedure, updateOrganizationProcedure } from "./routes/enterprise/organization/route";
import { getApiKeysProcedure, createApiKeyProcedure, revokeApiKeyProcedure } from "./routes/enterprise/api-keys/route";
import { getWebhooksProcedure, createWebhookProcedure, updateWebhookProcedure, deleteWebhookProcedure, testWebhookProcedure } from "./routes/enterprise/webhooks";
import getPrivacySettingsRoute from "./routes/privacy/get-settings/route";
import updatePrivacySettingsRoute from "./routes/privacy/update-settings/route";
import exportDataRoute from "./routes/privacy/export-data/route";
import deleteDataRoute from "./routes/privacy/delete-data/route";
import { updateConsent, getConsents } from "./routes/privacy/consent/route";
import accessLogsRoute from "./routes/privacy/access-logs/route";
import breachCheckRoute from "./routes/privacy/breach-check/route";
import registerRoute from "./routes/auth/register/route";
import loginRoute from "./routes/auth/login/route";
import verifyEmailRoute from "./routes/auth/verify-email/route";
import refreshTokenRoute from "./routes/auth/refresh-token/route";
import logoutRoute from "./routes/auth/logout/route";
import meRoute from "./routes/auth/me/route";
import changePasswordRoute from "./routes/auth/change-password/route";
import { getAgentsProcedure } from "./routes/ai-agents/get-agents/route";
import { toggleAgentProcedure, toggleAllAgentsProcedure } from "./routes/ai-agents/toggle-agent/route";
import { getStatsProcedure, getActivityProcedure, getAgentAnalyticsProcedure, getAgentActivityProcedure } from "./routes/ai-agents/get-stats/route";
import { getConnectionsProcedure, connectAgentToPlatformProcedure, disconnectAgentFromPlatformProcedure, syncConnectionProcedure, getAvailablePlatformsProcedure } from "./routes/ai-agents/connections/route";
import { getCoreCapabilitiesProcedure, toggleCoreCapabilityProcedure, getAnalysisPerformanceAgentsProcedure } from "./routes/ai-agents/core-intelligence/route";
import { aiAgentsRouter } from "./routes/ai-agents/router";
import { messagingRouter } from "./routes/messaging/router";
import { enhancedCounselingRouter } from "./routes/counseling/router";
import { aiOSRouter } from "./routes/ai-os/router";
import { agentsBrainRouter } from "./routes/agents-brain/index";
import { skillMDRouter } from "./routes/skill-md/index";

export const appRouter = createTRPCRouter({
  auth: createTRPCRouter({
    register: registerRoute,
    login: loginRoute,
    verifyEmail: verifyEmailRoute,
    refreshToken: refreshTokenRoute,
    logout: logoutRoute,
    me: meRoute,
    changePassword: changePasswordRoute,
  }),
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  analytics: createTRPCRouter({
    getMetrics: getMetricsRoute,
  }),
  marketing: createTRPCRouter({
    getCampaigns: getCampaignsRoute,
  }),
  business: createTRPCRouter({
    getCrmData: getCrmDataRoute,
  }),
  team: createTRPCRouter({
    getMembers: getTeamMembersRoute,
  }),
  notifications: createTRPCRouter({
    getAll: getNotificationsRoute,
  }),
  security: createTRPCRouter({
    getSettings: getSecuritySettingsRoute,
  }),
  platforms: createTRPCRouter({
    getAll: getAllPlatformsProcedure,
    listAll: listAllPlatformsProcedure,
    search: searchPlatformsProcedure,
    connectQR: connectQRProcedure,
    verifyQR: verifyQRProcedure,
    connectOAuth: connectOAuthProcedure,
    connectCredentials: connectCredentialsProcedure,
    verify2FA: verify2FAProcedure,
    disconnect: disconnectPlatformProcedure,
    sync: syncPlatformProcedure,
  }),
  aiAssistant: createTRPCRouter({
    negotiation: createTRPCRouter({
      getConfig: getNegotiationConfigProcedure,
      saveConfig: saveNegotiationConfigProcedure,
    }),
    receptionist: createTRPCRouter({
      getConfig: getReceptionistConfigProcedure,
      saveConfig: saveReceptionistConfigProcedure,
      getTranscripts: getTranscriptsProcedure,
      getTrainingFlows: getTrainingFlowsProcedure,
      getTrainingStats: getTrainingStatsProcedure,
      getVoiceSettings: getVoiceSettingsProcedure,
      updateVoiceSettings: updateVoiceSettingsProcedure,
      getVoicemails: getVoicemailsProcedure,
      markVoicemailRead: markVoicemailReadProcedure,
      toggleVoicemailFlag: toggleVoicemailFlagProcedure,
      deleteVoicemail: deleteVoicemailProcedure,
    }),
  }),
  enterprise: createTRPCRouter({
    getSubscription: getSubscriptionProcedure,
    getInvoices: getInvoicesProcedure,
    getUsageMetrics: getUsageMetricsProcedure,
    getOrganization: getOrganizationProcedure,
    updateOrganization: updateOrganizationProcedure,
    compliance: createTRPCRouter({
      getReports: getComplianceReportsProcedure,
      generateReport: generateComplianceReportProcedure,
    }),
    auditLogs: createTRPCRouter({
      get: getAuditLogsProcedure,
      export: exportAuditLogsProcedure,
    }),
    apiKeys: createTRPCRouter({
      get: getApiKeysProcedure,
      create: createApiKeyProcedure,
      revoke: revokeApiKeyProcedure,
    }),
    webhooks: createTRPCRouter({
      get: getWebhooksProcedure,
      create: createWebhookProcedure,
      update: updateWebhookProcedure,
      delete: deleteWebhookProcedure,
      test: testWebhookProcedure,
    }),
  }),
  privacy: createTRPCRouter({
    getSettings: getPrivacySettingsRoute,
    updateSettings: updatePrivacySettingsRoute,
    exportData: exportDataRoute,
    deleteData: deleteDataRoute,
    updateConsent: updateConsent,
    getConsents: getConsents,
    accessLogs: accessLogsRoute,
    breachCheck: breachCheckRoute,
  }),
  aiAgents: aiAgentsRouter,
  messaging: messagingRouter,
  counseling: enhancedCounselingRouter,
  aiOS: aiOSRouter,
  agentsBrain: agentsBrainRouter,
  skillMD: skillMDRouter,
});

export type AppRouter = typeof appRouter;
