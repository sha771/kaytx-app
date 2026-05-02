import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';

test.describe('User Workflows - Comprehensive E2E Tests', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test.describe('Authentication Flow', () => {
    test('should complete full user registration and login flow', async () => {
      // Navigate to registration
      await page.click('[data-testid="register-button"]');
      await expect(page.locator('[data-testid="registration-form"]')).toBeVisible();

      // Fill registration form
      await page.fill('[data-testid="name-input"]', 'Test User');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.fill('[data-testid="confirm-password-input"]', 'SecurePassword123!');
      await page.fill('[data-testid="organization-input"]', 'Test Organization');

      // Submit registration
      await page.click('[data-testid="register-submit"]');
      
      // Verify registration success
      await expect(page.locator('[data-testid="registration-success"]')).toBeVisible();
      
      // Wait for email verification (mock)
      await page.waitForTimeout(2000);
      
      // Login with new account
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.click('[data-testid="login-submit"]');
      
      // Verify successful login
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-name"]')).toContainText('Test User');
    });

    test('should handle password reset flow', async () => {
      // Navigate to login
      await page.click('[data-testid="login-button"]');
      
      // Click forgot password
      await page.click('[data-testid="forgot-password-link"]');
      await expect(page.locator('[data-testid="password-reset-form"]')).toBeVisible();
      
      // Enter email for password reset
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.click('[data-testid="reset-password-submit"]');
      
      // Verify reset email sent message
      await expect(page.locator('[data-testid="reset-email-sent"]')).toBeVisible();
      
      // Simulate clicking reset link from email
      await page.goto('http://localhost:3000/reset-password?token=mock-reset-token');
      await expect(page.locator('[data-testid="new-password-form"]')).toBeVisible();
      
      // Set new password
      await page.fill('[data-testid="new-password-input"]', 'NewSecurePassword123!');
      await page.fill('[data-testid="confirm-new-password-input"]', 'NewSecurePassword123!');
      await page.click('[data-testid="update-password-submit"]');
      
      // Verify password updated
      await expect(page.locator('[data-testid="password-updated"]')).toBeVisible();
      
      // Login with new password
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'NewSecurePassword123!');
      await page.click('[data-testid="login-submit"]');
      
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  test.describe('AI Agent Management', () => {
    test('should create, configure, and test AI agent', async () => {
      // Login first
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Navigate to AI agents
      await page.click('[data-testid="ai-agents-nav"]');
      await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();

      // Create new AI agent
      await page.click('[data-testid="create-agent-button"]');
      await expect(page.locator('[data-testid="agent-creation-form"]')).toBeVisible();

      // Fill agent configuration
      await page.fill('[data-testid="agent-name-input"]', 'Customer Service Bot');
      await page.fill('[data-testid="agent-description-input"]', 'Handles customer inquiries and support');
      await page.selectOption('[data-testid="agent-model-select"]', 'gpt-4');
      await page.fill('[data-testid="agent-temperature-input"]', '0.7');
      await page.fill('[data-testid="agent-max-tokens-input"]', '2048');
      await page.fill('[data-testid="agent-system-prompt"]', 'You are a helpful customer service agent.');

      // Save agent
      await page.click('[data-testid="save-agent-button"]');
      await expect(page.locator('[data-testid="agent-saved"]')).toBeVisible();

      // Test the agent
      await page.click('[data-testid="test-agent-button"]');
      await expect(page.locator('[data-testid="agent-test-interface"]')).toBeVisible();

      // Send test message
      await page.fill('[data-testid="test-message-input"]', 'Hello, I need help with my order');
      await page.click('[data-testid="send-test-message"]');

      // Wait for response
      await page.waitForSelector('[data-testid="agent-response"]');
      await expect(page.locator('[data-testid="agent-response"]')).toBeVisible();
      
      // Verify response content
      const response = await page.locator('[data-testid="agent-response"]').textContent();
      expect(response).toBeTruthy();
      expect(response.length).toBeGreaterThan(10);
    });

    test('should manage agent workflows and configurations', async () => {
      // Login and navigate to agents
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');
      await page.click('[data-testid="ai-agents-nav"]');

      // Select existing agent
      await page.click('[data-testid="agent-card"]:first-child');
      await expect(page.locator('[data-testid="agent-details"]')).toBeVisible();

      // Navigate to workflows
      await page.click('[data-testid="workflows-tab"]');
      await expect(page.locator('[data-testid="workflows-list"]')).toBeVisible();

      // Create new workflow
      await page.click('[data-testid="create-workflow-button"]');
      await expect(page.locator('[data-testid="workflow-builder"]')).toBeVisible();

      // Add workflow steps
      await page.dragAndDrop('[data-testid="step-input"]', '[data-testid="workflow-canvas"]');
      await page.dragAndDrop('[data-testid="step-processing"]', '[data-testid="workflow-canvas"]');
      await page.dragAndDrop('[data-testid="step-output"]', '[data-testid="workflow-canvas"]');

      // Configure first step
      await page.click('[data-testid="step-1"]');
      await page.fill('[data-testid="step-prompt"]', 'Greet the customer and ask how you can help');

      // Configure second step
      await page.click('[data-testid="step-2"]');
      await page.fill('[data-testid="step-prompt"]', 'Analyze the customer request and determine the best response');

      // Configure third step
      await page.click('[data-testid="step-3"]');
      await page.fill('[data-testid="step-prompt"]', 'Provide a helpful response to the customer');

      // Save workflow
      await page.click('[data-testid="save-workflow-button"]');
      await expect(page.locator('[data-testid="workflow-saved"]')).toBeVisible();

      // Test workflow
      await page.click('[data-testid="test-workflow-button"]');
      await page.fill('[data-testid="workflow-test-input"]', 'I have a problem with my recent order');
      await page.click('[data-testid="run-workflow-test"]');

      // Verify workflow execution
      await page.waitForSelector('[data-testid="workflow-test-result"]');
      await expect(page.locator('[data-testid="workflow-test-result"]')).toBeVisible();
    });
  });

  test.describe('Platform Integration', () => {
    test('should connect and sync with external platforms', async () => {
      // Login
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');

      // Navigate to integrations
      await page.click('[data-testid="integrations-nav"]');
      await expect(page.locator('[data-testid="integrations-page"]')).toBeVisible();

      // Connect to CRM platform
      await page.click('[data-testid="connect-crm-button"]');
      await expect(page.locator('[data-testid="crm-connection-form"]')).toBeVisible();

      // Fill CRM connection details
      await page.selectOption('[data-testid="crm-provider-select"]', 'salesforce');
      await page.fill('[data-testid="crm-api-key-input"]', 'test-api-key-12345');
      await page.fill('[data-testid="crm-domain-input"]', 'test.crm.example.com');

      // Test connection
      await page.click('[data-testid="test-connection-button"]');
      await expect(page.locator('[data-testid="connection-success"]')).toBeVisible();

      // Save connection
      await page.click('[data-testid="save-connection-button"]');
      await expect(page.locator('[data-testid="connection-saved"]')).toBeVisible();

      // Sync data
      await page.click('[data-testid="sync-data-button"]');
      await expect(page.locator('[data-testid="sync-in-progress"]')).toBeVisible();

      // Wait for sync to complete
      await page.waitForSelector('[data-testid="sync-completed"]', { timeout: 30000 });
      await expect(page.locator('[data-testid="sync-completed"]')).toBeVisible();

      // Verify synced data
      await page.click('[data-testid="view-synced-data"]');
      await expect(page.locator('[data-testid="synced-data-table"]')).toBeVisible();
    });

    test('should handle integration errors and reconnection', async () => {
      // Login and navigate to integrations
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');
      await page.click('[data-testid="integrations-nav"]');

      // Attempt connection with invalid credentials
      await page.click('[data-testid="connect-crm-button"]');
      await page.selectOption('[data-testid="crm-provider-select"]', 'salesforce');
      await page.fill('[data-testid="crm-api-key-input"]', 'invalid-api-key');
      await page.fill('[data-testid="crm-domain-input"]', 'invalid.domain.com');
      await page.click('[data-testid="test-connection-button"]');

      // Verify error handling
      await expect(page.locator('[data-testid="connection-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');

      // Retry with correct credentials
      await page.fill('[data-testid="crm-api-key-input"]', 'correct-api-key');
      await page.fill('[data-testid="crm-domain-input"]', 'valid.crm.example.com');
      await page.click('[data-testid="test-connection-button"]');

      // Verify successful reconnection
      await expect(page.locator('[data-testid="connection-success"]')).toBeVisible();
    });
  });

  test.describe('Analytics and Reporting', () => {
    test('should display comprehensive analytics dashboard', async () => {
      // Login
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');

      // Navigate to analytics
      await page.click('[data-testid="analytics-nav"]');
      await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();

      // Verify key metrics
      await expect(page.locator('[data-testid="total-conversations"]')).toBeVisible();
      await expect(page.locator('[data-testid="active-agents"]')).toBeVisible();
      await expect(page.locator('[data-testid="response-time"]')).toBeVisible();
      await expect(page.locator('[data-testid="satisfaction-rate"]')).toBeVisible();

      // Test date range Filter
      await page.click('[data-testid="date-range-picker"]');
      await page.click('[data-testid="last-30-days"]');
      await page.waitForTimeout(1000);

      // Verify data updates
      const conversationsAfter = await page.locator('[data-testid="total-conversations"]').textContent();
      expect(conversationsAfter).toBeTruthy();

      // Test export functionality
      await page.click('[data-testid="export-report-button"]');
      await expect(page.locator('[data-testid="export-options"]')).toBeVisible();

      await page.selectOption('[data-testid="export-format-select"]', 'csv');
      await page.click('[data-testid="download-export-button"]');

      // Verify download initiated (check for download attribute or network request)
      const downloadPromise = page.waitForEvent('download');
      await page.click('[data-testid="confirm-download"]');
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/\.csv$/);
    });

    test('should generate and view detailed reports', async () => {
      // Login and navigate to reports
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');
      await page.click('[data-testid="reports-nav"]');

      // Create custom report
      await page.click('[data-testid="create-report-button"]');
      await expect(page.locator('[data-testid="report-builder"]')).toBeVisible();

      // Configure report
      await page.fill('[data-testid="report-name-input"]', 'Monthly Performance Report');
      await page.selectOption('[data-testid="report-type-select"]', 'agent_performance');
      await page.click('[data-testid="include-metrics-conversations"]');
      await page.click('[data-testid="include-metrics-response-time"]');
      await page.click('[data-testid="include-metrics-satisfaction"]');

      // Set date range
      await page.click('[data-testid="report-date-range"]');
      await page.click('[data-testid="this-month"]');

      // Generate report
      await page.click('[data-testid="generate-report-button"]');
      await expect(page.locator('[data-testid="report-generating"]')).toBeVisible();

      // Wait for report completion
      await page.waitForSelector('[data-testid="report-ready"]', { timeout: 30000 });
      await expect(page.locator('[data-testid="report-ready"]')).toBeVisible();

      // View report details
      await page.click('[data-testid="view-report-button"]');
      await expect(page.locator('[data-testid="report-details"]')).toBeVisible();

      // Verify report sections
      await expect(page.locator('[data-testid="report-summary"]')).toBeVisible();
      await expect(page.locator('[data-testid="report-charts"]')).toBeVisible();
      await expect(page.locator('[data-testid="report-tables"]')).toBeVisible();
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should work correctly on mobile devices', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');

      // Test mobile navigation
      await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
      await page.click('[data-testid="mobile-menu-button"]');
      await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible();

      // Test mobile login
      await page.click('[data-testid="mobile-login-link"]');
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
      
      await page.fill('[data-testid="mobile-email-input"]', 'test@example.com');
      await page.fill('[data-testid="mobile-password-input"]', 'password123');
      await page.click('[data-testid="mobile-login-button"]');

      // Verify mobile dashboard
      await expect(page.locator('[data-testid="mobile-dashboard"]')).toBeVisible();
      await expect(page.locator('[data-testid="mobile-agent-cards"]')).toBeVisible();

      // Test mobile agent interaction
      await page.click('[data-testid="mobile-agent-card"]:first-child');
      await expect(page.locator('[data-testid="mobile-agent-chat"]')).toBeVisible();

      await page.fill('[data-testid="mobile-chat-input"]', 'Hello from mobile');
      await page.click('[data-testid="mobile-send-button"]');

      // Verify mobile chat functionality
      await expect(page.locator('[data-testid="mobile-chat-message"]')).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle network errors gracefully', async () => {
      // Login
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');

      // Simulate network failure
      await page.route('**/api/**', route => route.abort());

      // Attempt operation that requires network
      await page.click('[data-testid="ai-agents-nav"]');
      
      // Verify error handling
      await expect(page.locator('[data-testid="network-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();

      // Test retry functionality
      await page.unroute('**/api/**');
      await page.click('[data-testid="retry-button"]');

      // Verify recovery
      await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();
    });

    test('should handle session timeout and re-authentication', async () => {
      // Login
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'adminpassword');
      await page.click('[data-testid="login-submit"]');

      // Simulate session timeout
      await page.evaluate(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userSession');
      });

      // Attempt operation requiring authentication
      await page.click('[data-testid="ai-agents-nav"]');

      // Verify session timeout handling
      await expect(page.locator('[data-testid="session-expired"]')).toBeVisible();
      await expect(page.locator('[data-testid="re-authenticate-button"]')).toBeVisible();

      // Re-authenticate
      await page.click('[data-testid="re-authenticate-button"]');
      await page.fill('[data-testid="reauth-password-input"]', 'adminpassword');
      await page.click('[data-testid="reauth-submit-button"]');

      // Verify successful re-authentication
      await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();
    });
  });
});
