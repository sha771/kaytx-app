import { apiClient as trpcApiClient } from '@/lib/trpc-client';

const apiClient = {
  getCurrentUser: () => trpcApiClient.user.getCurrent.query(),
  getCompanyBrainDashboard: () => trpcApiClient.companyBrain.dashboard.query(),
  getCompanyBrainDocuments: () => trpcApiClient.companyBrain.documents.query(),
  getCompanyBrainTeam: () => trpcApiClient.companyBrain.team.query(),
  getCompanyBrainSettings: () => trpcApiClient.companyBrain.settings.query(),
  getCompanyBrainAnalytics: () => trpcApiClient.companyBrain.analytics.query(),
  getCompanyBrainOnboarding: () => trpcApiClient.companyBrain.onboarding.query(),
  getCompanyBrainSuccession: () => trpcApiClient.companyBrain.succession.query(),
};

export default apiClient;
export { apiClient };
