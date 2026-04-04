import { createTRPCRouter } from "./create-context";
import { chatProcedure } from "./routes/ai-assistant/chat/route";
import hiRoute from "./routes/example/hi/route";
import getMetricsRoute from "./routes/analytics/get-metrics/route";
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
import { listBridgesProcedure as oldListBridges, bridgeStatusProcedure as oldBridgeStatus, connectBridgeProcedure as oldConnectBridge, disconnectBridgeProcedure as oldDisconnectBridge, sendTestBridgeProcedure } from "./routes/platforms/bridges/router";
import { listBridgesProcedure } from "./routes/bridges/list/route";
import { connectBridgeProcedure } from "./routes/bridges/connect/route";
import { disconnectBridgeProcedure } from "./routes/bridges/disconnect/route";
import { bridgeStatusProcedure } from "./routes/bridges/status/route";
import { bridgeHealthProcedure } from "./routes/bridges/health/route";
import { createBridgeProcedure } from "./routes/bridges/create/route";
import { listAllPlatformsProcedure } from "./routes/platforms/list-all/route";
import { searchPlatformsProcedure } from "./routes/platforms/search/route";
import { getNegotiationConfigProcedure } from "./routes/ai-assistant/negotiation/get-config/route";
import { saveNegotiationConfigProcedure } from "./routes/ai-assistant/negotiation/save-config/route";
import { getReceptionistConfigProcedure } from "./routes/ai-assistant/receptionist/get-config/route";
import { saveReceptionistConfigProcedure } from "./routes/ai-assistant/receptionist/save-config/route";
import { getSubscriptionProcedure } from "./routes/enterprise/get-subscription/route";
import { getInvoicesProcedure } from "./routes/enterprise/get-invoices/route";
import { getUsageMetricsProcedure } from "./routes/enterprise/get-usage-metrics/route";
import { getComplianceReportsProcedure, generateComplianceReportProcedure } from "./routes/enterprise/compliance/route";
import { getAuditLogsProcedure, exportAuditLogsProcedure } from "./routes/enterprise/audit-logs/route";
import { getOrganizationProcedure, updateOrganizationProcedure } from "./routes/enterprise/organization/route";
import { getApiKeysProcedure, createApiKeyProcedure, revokeApiKeyProcedure } from "./routes/enterprise/api-keys/route";
import { getWebhooksProcedure, createWebhookProcedure, updateWebhookProcedure, deleteWebhookProcedure, testWebhookProcedure } from "./routes/enterprise/webhooks/route";
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
    bridges: createTRPCRouter({
      list: oldListBridges,
      status: oldBridgeStatus,
      connect: oldConnectBridge,
      disconnect: oldDisconnectBridge,
      sendTest: sendTestBridgeProcedure,
    }),
  }),
  bridges: createTRPCRouter({
    list: listBridgesProcedure,
    create: createBridgeProcedure,
    connect: connectBridgeProcedure,
    disconnect: disconnectBridgeProcedure,
    status: bridgeStatusProcedure,
    health: bridgeHealthProcedure,
  }),
  aiAssistant: createTRPCRouter({
    chat: chatProcedure,
    negotiation: createTRPCRouter({
      getConfig: getNegotiationConfigProcedure,
      saveConfig: saveNegotiationConfigProcedure,
    }),
    receptionist: createTRPCRouter({
      getConfig: getReceptionistConfigProcedure,
      saveConfig: saveReceptionistConfigProcedure,
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
});

export type AppRouter = typeof appRouter;
