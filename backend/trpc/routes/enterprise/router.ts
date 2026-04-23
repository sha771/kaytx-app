import { createTRPCRouter } from '../../create-context';
import { getSubscriptionProcedure } from './get-subscription/route';
import { getInvoicesProcedure } from './get-invoices/route';
import { getUsageMetricsProcedure } from './get-usage-metrics/route';
import { getComplianceReportsProcedure, generateComplianceReportProcedure } from './compliance/route';
import { getAuditLogsProcedure, exportAuditLogsProcedure } from './audit-logs/route';
import { getOrganizationProcedure, updateOrganizationProcedure } from './organization/route';
import { getApiKeysProcedure, createApiKeyProcedure, rotateApiKeyProcedure, revokeApiKeyProcedure } from './api-keys/route';
import { webhooksRouter } from './webhooks';
import { backupRouter } from './backup';
import {
  updateSubscriptionProcedure,
  cancelSubscriptionProcedure,
  pauseSubscriptionProcedure,
  resumeSubscriptionProcedure,
} from './manage-subscription/route';
import {
  getInvoicesProcedure as getBillingInvoicesProcedure,
  getInvoiceByIdProcedure,
  getPaymentMethodsProcedure,
  addPaymentMethodProcedure,
  updatePaymentMethodProcedure,
  deletePaymentMethodProcedure,
  makePaymentProcedure,
  getBillingSummaryProcedure,
} from './billing/route';
import {
  inviteUserProcedure,
  updateUserProcedure,
  removeUserProcedure,
  getTeamMembersProcedure,
  getTeamStatsProcedure,
} from './team-management/route';
import {
  getRolePermissionsProcedure,
  updateRolePermissionsProcedure,
  getUserPermissionsProcedure,
  updateUserPermissionsProcedure,
  checkPermissionProcedure,
  getAllPermissionsProcedure,
  createRoleProcedure,
  updateRoleProcedure,
  deleteRoleProcedure,
} from './permissions/route';
import {
  getDashboardAnalyticsProcedure,
  getUsageAnalyticsProcedure,
  getPerformanceAnalyticsProcedure,
  getUserAnalyticsProcedure,
  getCustomReportProcedure,
  getRealTimeMetricsProcedure,
} from './analytics/route';
import {
  getIntegrationsProcedure,
  createIntegrationProcedure,
  updateIntegrationProcedure,
  deleteIntegrationProcedure,
  testIntegrationProcedure,
  getIntegrationLogsProcedure,
  getIntegrationMetricsProcedure,
  getAvailableIntegrationsProcedure,
} from './integrations/route';

export const enterpriseRouter = createTRPCRouter({
    getSubscription: getSubscriptionProcedure,
    getInvoices: getInvoicesProcedure,
    getUsageMetrics: getUsageMetricsProcedure,
    getOrganization: getOrganizationProcedure,
    updateOrganization: updateOrganizationProcedure,
    backup: backupRouter,
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
        rotate: rotateApiKeyProcedure,
        revoke: revokeApiKeyProcedure,
    }),
    webhooks: webhooksRouter,
    subscription: createTRPCRouter({
        update: updateSubscriptionProcedure,
        cancel: cancelSubscriptionProcedure,
        pause: pauseSubscriptionProcedure,
        resume: resumeSubscriptionProcedure,
    }),
    billing: createTRPCRouter({
        getInvoices: getBillingInvoicesProcedure,
        getInvoiceById: getInvoiceByIdProcedure,
        getPaymentMethods: getPaymentMethodsProcedure,
        addPaymentMethod: addPaymentMethodProcedure,
        updatePaymentMethod: updatePaymentMethodProcedure,
        deletePaymentMethod: deletePaymentMethodProcedure,
        makePayment: makePaymentProcedure,
        getSummary: getBillingSummaryProcedure,
    }),
    team: createTRPCRouter({
        inviteUser: inviteUserProcedure,
        updateUser: updateUserProcedure,
        removeUser: removeUserProcedure,
        getMembers: getTeamMembersProcedure,
        getStats: getTeamStatsProcedure,
    }),
    permissions: createTRPCRouter({
        getRolePermissions: getRolePermissionsProcedure,
        updateRolePermissions: updateRolePermissionsProcedure,
        getUserPermissions: getUserPermissionsProcedure,
        updateUserPermissions: updateUserPermissionsProcedure,
        checkPermission: checkPermissionProcedure,
        getAllPermissions: getAllPermissionsProcedure,
        createRole: createRoleProcedure,
        updateRole: updateRoleProcedure,
        deleteRole: deleteRoleProcedure,
    }),
    analytics: createTRPCRouter({
        getDashboard: getDashboardAnalyticsProcedure,
        getUsage: getUsageAnalyticsProcedure,
        getPerformance: getPerformanceAnalyticsProcedure,
        getUser: getUserAnalyticsProcedure,
        getCustomReport: getCustomReportProcedure,
        getRealTimeMetrics: getRealTimeMetricsProcedure,
    }),
    integrations: createTRPCRouter({
        getAll: getIntegrationsProcedure,
        create: createIntegrationProcedure,
        update: updateIntegrationProcedure,
        delete: deleteIntegrationProcedure,
        test: testIntegrationProcedure,
        getLogs: getIntegrationLogsProcedure,
        getMetrics: getIntegrationMetricsProcedure,
        getAvailable: getAvailableIntegrationsProcedure,
    }),
});
