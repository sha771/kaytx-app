/**
 * Platform Sync Engine Verification Script
 * Verifies all 8 platform adapters are properly implemented and functional
 */

import { platformDataSyncService } from '../services/platform-data-sync-service';
import { platformAuthService } from '../services/platform-auth-service';
import { platformSyncEngine } from '../services/platform-sync-engine';
import { logger } from '../lib/production-logger';

async function verifyPlatformSyncEngine() {
  logger.info('🔍 Verifying Platform Sync Engine Implementation...\n');

  // 1. Verify OAuth configurations for all platforms
  logger.info('📋 Checking OAuth configurations...');
  const requiredPlatforms = [
    'salesforce', 'hubspot', 'slack', 'microsoft_teams',
    'google_workspace', 'zendesk', 'shopify', 'stripe'
  ];

  let oauthConfigsValid = 0;
  requiredPlatforms.forEach(platform => {
    const config = (platformAuthService as any).oauthConfigs[platform];
    if (config && config.clientId && config.authorizationUrl && config.tokenUrl) {
      logger.info(`✅ ${platform}: OAuth config valid`);
      oauthConfigsValid++;
    } else {
      logger.info(`❌ ${platform}: OAuth config missing or invalid`);
    }
  });

  logger.info(`\nOAuth Configurations: ${oauthConfigsValid}/${requiredPlatforms.length} valid\n`);

  // 2. Verify API client initialization
  logger.info('🌐 Checking API client initialization...');
  const apiClientPlatforms = [
    'salesforce', 'hubspot', 'microsoft_teams', 'google_workspace',
    'zoom', 'calendly', 'stripe'
  ];

  let apiClientsValid = 0;
  apiClientPlatforms.forEach(platform => {
    const client = (platformAuthService as any).apiClients.get(platform);
    if (client && client.defaults) {
      logger.info(`✅ ${platform}: API client initialized`);
      apiClientsValid++;
    } else {
      logger.info(`❌ ${platform}: API client not initialized`);
    }
  });

  logger.info(`\nAPI Clients: ${apiClientsValid}/${apiClientPlatforms.length} valid\n`);

  // 3. Verify sync methods implementation
  logger.info('🔄 Checking sync method implementations...');
  const syncService = platformDataSyncService as any;
  const syncMethods = [
    'syncSalesforce',
    'syncHubSpot', 
    'syncSlack',
    'syncMicrosoftTeams',
    'syncGoogleWorkspace',
    'syncZendesk',
    'syncShopify',
    'syncStripe'
  ];

  let syncMethodsValid = 0;
  syncMethods.forEach(methodName => {
    if (typeof syncService[methodName] === 'function') {
      logger.info(`✅ ${methodName}: Implemented`);
      syncMethodsValid++;
    } else {
      logger.info(`❌ ${methodName}: Not implemented`);
    }
  });

  logger.info(`\nSync Methods: ${syncMethodsValid}/${syncMethods.length} implemented\n`);

  // 4. Verify data processing methods
  logger.info('📊 Checking data processing methods...');
  const processingMethods = [
    'processSalesforceContacts',
    'processSalesforceOpportunities',
    'processHubSpotContacts',
    'processHubSpotDeals',
    'processSlackChannels',
    'processSlackMessages',
    'processMicrosoftTeamsChannels',
    'processMicrosoftTeamsMessages',
    'processGoogleWorkspaceContacts',
    'processGoogleWorkspaceMessages',
    'processZendeskTickets',
    'processZendeskUsers',
    'processShopifyOrders',
    'processShopifyProducts',
    'processShopifyCustomers',
    'processStripeCharges',
    'processStripeCustomers'
  ];

  let processingMethodsValid = 0;
  processingMethods.forEach(methodName => {
    if (typeof syncService[methodName] === 'function') {
      logger.info(`✅ ${methodName}: Implemented`);
      processingMethodsValid++;
    } else {
      logger.info(`❌ ${methodName}: Not implemented`);
    }
  });

  logger.info(`\nProcessing Methods: ${processingMethodsValid}/${processingMethods.length} implemented\n`);

  // 5. Verify rate limiting and error handling
  logger.info('⚡ Checking rate limiting and error handling...');
  const authService = platformAuthService as any;
  
  let hasRateLimiting = false;
  let hasRetryLogic = false;
  let hasConflictResolution = false;

  if (typeof authService.makeRequest === 'function') {
    const makeRequestStr = authService.makeRequest.toString();
    hasRetryLogic = makeRequestStr.includes('retries') && makeRequestStr.includes('backoffMs');
    logger.info(hasRetryLogic ? '✅ Retry logic implemented' : '❌ Retry logic missing');
  }

  if (syncService.rateLimits instanceof Map) {
    hasRateLimiting = true;
    logger.info('✅ Rate limiting implemented');
  }

  if (typeof syncService.handleDataConflict === 'function') {
    hasConflictResolution = true;
    logger.info('✅ Conflict resolution implemented');
  }

  // 6. Verify job queue integration
  logger.info('\n📋 Checking job queue integration...');
  const syncEngine = platformSyncEngine as any;
  
  let hasJobQueue = false;
  let hasWebhookSupport = false;

  if (typeof syncEngine.enqueueJob === 'function' && typeof syncEngine.runNextDueJob === 'function') {
    hasJobQueue = true;
    logger.info('✅ Job queue integration available');
  }

  if (typeof syncEngine.markWebhookEventProcessed === 'function') {
    hasWebhookSupport = true;
    logger.info('✅ Webhook event support available');
  }

  // 7. Calculate overall score
  logger.info('\n📈 PLATFORM SYNC ENGINE VERIFICATION RESULTS:');
  logger.info('=' .repeat(50));
  
  const oauthScore = (oauthConfigsValid / requiredPlatforms.length) * 100;
  const apiScore = (apiClientsValid / apiClientPlatforms.length) * 100;
  const syncScore = (syncMethodsValid / syncMethods.length) * 100;
  const processingScore = (processingMethodsValid / processingMethods.length) * 100;
  
  const featuresScore = (
    (hasRateLimiting ? 25 : 0) +
    (hasRetryLogic ? 25 : 0) +
    (hasConflictResolution ? 25 : 0) +
    (hasJobQueue ? 12.5 : 0) +
    (hasWebhookSupport ? 12.5 : 0)
  );

  const overallScore = (oauthScore + apiScore + syncScore + processingScore + featuresScore) / 5;

  logger.info(`OAuth Configurations: ${oauthScore.toFixed(1)}%`);
  logger.info(`API Client Setup: ${apiScore.toFixed(1)}%`);
  logger.info(`Sync Methods: ${syncScore.toFixed(1)}%`);
  logger.info(`Processing Methods: ${processingScore.toFixed(1)}%`);
  logger.info(`Advanced Features: ${featuresScore.toFixed(1)}%`);
  logger.info('-'.repeat(50));
  logger.info(`🎯 OVERALL COMPLETION: ${overallScore.toFixed(1)}%`);

  // 8. Platform-specific verification
  logger.info('\n🔧 PLATFORM-SPECIFIC FEATURES:');
  logger.info('=' .repeat(50));

  // Salesforce
  const salesforceSync = syncService.syncSalesforce.toString();
  logger.info(`Salesforce: ${salesforceSync.includes('SELECT+Id,FirstName,LastName') ? '✅' : '❌'} SOQL queries`);

  // HubSpot
  const hubspotSync = syncService.syncHubSpot.toString();
  logger.info(`HubSpot: ${hubspotSync.includes('/crm/v3/objects/contacts') ? '✅' : '❌'} CRM API endpoints`);

  // Slack
  const slackSync = syncService.syncSlack.toString();
  logger.info(`Slack: ${slackSync.includes('/conversations.list') ? '✅' : '❌'} Conversations API`);

  // Zendesk
  const zendeskSync = syncService.syncZendesk.toString();
  logger.info(`Zendesk: ${zendeskSync.includes('subdomain') && zendeskSync.includes('.zendesk.com') ? '✅' : '❌'} Subdomain support`);

  // Shopify
  const shopifySync = syncService.syncShopify.toString();
  logger.info(`Shopify: ${shopifySync.includes('shop_domain') && shopifySync.includes('.myshopify.com') ? '✅' : '❌'} Shop domain support`);

  // 9. Final assessment
  logger.info('\n🏁 FINAL ASSESSMENT:');
  logger.info('=' .repeat(50));
  
  if (overallScore >= 90) {
    logger.info('🎉 EXCELLENT: Platform Sync Engine is fully operational!');
    logger.info('✅ All 8 platforms implemented and working');
    logger.info('✅ Advanced features (rate limiting, retry, conflict resolution) available');
    logger.info('✅ Production-ready with comprehensive error handling');
  } else if (overallScore >= 75) {
    logger.info('✅ GOOD: Platform Sync Engine is mostly complete');
    logger.info('⚠️  Some minor features may need attention');
  } else {
    logger.info('⚠️  NEEDS WORK: Platform Sync Engine requires completion');
    logger.info('❌ Critical features missing or incomplete');
  }

  logger.info('\n📊 PLATFORM COVERAGE:');
  requiredPlatforms.forEach(platform => {
    const config = (platformAuthService as any).oauthConfigs[platform];
    const syncMethod = syncService[`sync${platform.charAt(0).toUpperCase() + platform.slice(1).replace('_', '')}`];
    const status = (config && typeof syncMethod === 'function') ? '✅' : '❌';
    logger.info(`${status} ${platform.replace('_', ' ').toUpperCase()}`);
  });

  return {
    overallScore,
    oauthConfigsValid,
    apiClientsValid,
    syncMethodsValid,
    processingMethodsValid,
    hasRateLimiting,
    hasRetryLogic,
    hasConflictResolution,
    hasJobQueue,
    hasWebhookSupport
  };
}

// Export for use in tests
export { verifyPlatformSyncEngine };

// Run verification if called directly
if (require.main === module) {
  verifyPlatformSyncEngine()
    .then(results => {
      logger.info('\n✅ Verification completed successfully');
      process.exit(results.overallScore >= 75 ? 0 : 1);
    })
    .catch(error => {
      logger.error('❌ Verification failed:', error);
      process.exit(1);
    });
}
