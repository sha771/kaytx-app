import { test, expect } from '@playwright/test';

test.describe('User Workflows E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');
    
    // Login with test credentials
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    
    // Wait for successful login
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should create and configure AI agent', async ({ page }) => {
    // Navigate to AI agents page
    await page.click('[data-testid="ai-agents-nav"]');
    await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();

    // Click create new agent button
    await page.click('[data-testid="create-agent-button"]');
    await expect(page.locator('[data-testid="agent-form"]')).toBeVisible();

    // Fill agent details
    await page.fill('[data-testid="agent-name"]', 'Test Customer Service Agent');
    await page.fill('[data-testid="agent-description"]', 'Handles customer inquiries');
    await page.selectOption('[data-testid="agent-model"]', 'gpt-4');
    await page.fill('[data-testid="agent-temperature"]', '0.7');
    await page.fill('[data-testid="agent-max-tokens"]', '2048');
    await page.fill('[data-testid="agent-system-prompt"]', 'You are a helpful customer service agent.');

    // Add tools
    await page.click('[data-testid="add-tool-button"]');
    await page.fill('[data-testid="tool-name"]', 'customer_lookup');
    await page.fill('[data-testid="tool-description"]', 'Look up customer information');
    await page.check('[data-testid="tool-enabled"]');

    // Save agent
    await page.click('[data-testid="save-agent-button"]');
    
    // Verify agent was created
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Agent created successfully');
    await expect(page.locator('[data-testid="agent-list"]')).toContainText('Test Customer Service Agent');
  });

  test('should create and execute AI workflow', async ({ page }) => {
    // First create an agent
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="create-agent-button"]');
    await page.fill('[data-testid="agent-name"]', 'Workflow Test Agent');
    await page.selectOption('[data-testid="agent-model"]', 'gpt-4');
    await page.click('[data-testid="save-agent-button"]');
    
    // Navigate to workflows
    await page.click('[data-testid="workflows-nav"]');
    await expect(page.locator('[data-testid="workflows-page"]')).toBeVisible();

    // Create new workflow
    await page.click('[data-testid="create-workflow-button"]');
    await expect(page.locator('[data-testid="workflow-form"]')).toBeVisible();

    // Fill workflow details
    await page.fill('[data-testid="workflow-name"]', 'Test Customer Inquiry Workflow');
    await page.fill('[data-testid="workflow-description"]', 'Processes customer inquiries');
    await page.selectOption('[data-testid="workflow-agent"]', 'Workflow Test Agent');

    // Add workflow step
    await page.click('[data-testid="add-step-button"]');
    await page.selectOption('[data-testid="step-type"]', 'ai_processing');
    await page.fill('[data-testid="step-prompt"]', 'Process this customer inquiry: {{input}}');
    await page.fill('[data-testid="step-output-variable"]', 'processed_response');

    // Save workflow
    await page.click('[data-testid="save-workflow-button"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Workflow created successfully');

    // Execute workflow
    await page.click('[data-testid="execute-workflow-button"]');
    await page.fill('[data-testid="workflow-input"]', 'I need help with my order');
    await page.click('[data-testid="run-workflow-button"]');

    // Wait for execution to complete
    await expect(page.locator('[data-testid="execution-result"]')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('[data-testid="execution-status"]')).toContainText('completed');
  });

  test('should manage leads through the interface', async ({ page }) => {
    // Navigate to leads page
    await page.click('[data-testid="leads-nav"]');
    await expect(page.locator('[data-testid="leads-page"]')).toBeVisible();

    // Create new lead
    await page.click('[data-testid="create-lead-button"]');
    await expect(page.locator('[data-testid="lead-form"]')).toBeVisible();

    // Fill lead details
    await page.fill('[data-testid="lead-first-name"]', 'John');
    await page.fill('[data-testid="lead-last-name"]', 'Doe');
    await page.fill('[data-testid="lead-email"]', 'john.doe@example.com');
    await page.fill('[data-testid="lead-company"]', 'Test Corporation');
    await page.fill('[data-testid="lead-phone"]', '+1-555-0123');
    await page.selectOption('[data-testid="lead-status"]', 'new');
    await page.selectOption('[data-testid="lead-source"]', 'website');

    // Save lead
    await page.click('[data-testid="save-lead-button"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Lead created successfully');

    // Verify lead appears in list
    await expect(page.locator('[data-testid="leads-list"]')).toContainText('John Doe');
    await expect(page.locator('[data-testid="leads-list"]')).toContainText('john.doe@example.com');

    // Edit lead
    await page.click('[data-testid="edit-lead-button"]');
    await page.selectOption('[data-testid="lead-status"]', 'contacted');
    await page.click('[data-testid="save-lead-button"]');

    // Verify status was updated
    await expect(page.locator('[data-testid="lead-status-badge"]')).toContainText('contacted');
  });

  test('should create and send email campaign', async ({ page }) => {
    // Navigate to email campaigns
    await page.click('[data-testid="email-campaigns-nav"]');
    await expect(page.locator('[data-testid="email-campaigns-page"]')).toBeVisible();

    // Create new campaign
    await page.click('[data-testid="create-campaign-button"]');
    await expect(page.locator('[data-testid="campaign-form"]')).toBeVisible();

    // Fill campaign details
    await page.fill('[data-testid="campaign-name"]', 'Test Newsletter Campaign');
    await page.fill('[data-testid="campaign-subject"]', 'Special Offer - Limited Time');
    
    // Fill campaign content using rich text editor
    await page.fill('[data-testid="campaign-content"]', 'Hello {{firstName}},\n\nWe have a special offer for you!\n\nBest regards,\nThe Team');

    // Schedule campaign
    await page.selectOption('[data-testid="campaign-status"]', 'scheduled');
    await page.fill('[data-testid="campaign-schedule-date"]', '2024-12-31');
    await page.fill('[data-testid="campaign-schedule-time"]', '10:00');

    // Save campaign
    await page.click('[data-testid="save-campaign-button"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Campaign created successfully');

    // Verify campaign appears in list
    await expect(page.locator('[data-testid="campaigns-list"]')).toContainText('Test Newsletter Campaign');
    await expect(page.locator('[data-testid="campaign-status-badge"]')).toContainText('scheduled');
  });

  test('should configure platform sync', async ({ page }) => {
    // Navigate to platform integrations
    await page.click('[data-testid="integrations-nav"]');
    await expect(page.locator('[data-testid="integrations-page"]')).toBeVisible();

    // Add new integration
    await page.click('[data-testid="add-integration-button"]');
    await expect(page.locator('[data-testid="integration-form"]')).toBeVisible();

    // Select platform
    await page.selectOption('[data-testid="platform-select"]', 'salesforce');

    // Fill configuration
    await page.fill('[data-testid="api-key"]', 'test-salesforce-api-key');
    await page.fill('[data-testid="base-url"]', 'https://test.salesforce.com');
    await page.selectOption('[data-testid="sync-type"]', 'bidirectional');

    // Configure field mapping
    await page.click('[data-testid="configure-mapping-button"]');
    await page.fill('[data-testid="mapping-first-name"]', 'FirstName');
    await page.fill('[data-testid="mapping-last-name"]', 'LastName');
    await page.fill('[data-testid="mapping-email"]', 'Email');

    // Save configuration
    await page.click('[data-testid="save-integration-button"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Integration configured successfully');

    // Test connection
    await page.click('[data-testid="test-connection-button"]');
    await expect(page.locator('[data-testid="connection-status"]')).toContainText('Connection successful');
  });

  test('should handle user profile management', async ({ page }) => {
    // Navigate to user profile
    await page.click('[data-testid="user-profile-nav"]');
    await expect(page.locator('[data-testid="profile-page"]')).toBeVisible();

    // Update profile information
    await page.click('[data-testid="edit-profile-button"]');
    await page.fill('[data-testid="profile-first-name"]', 'Test');
    await page.fill('[data-testid="profile-last-name"]', 'User');
    await page.fill('[data-testid="profile-phone"]', '+1-555-0123');
    await page.click('[data-testid="save-profile-button"]');

    // Verify profile was updated
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Profile updated successfully');

    // Change password
    await page.click('[data-testid="change-password-button"]');
    await page.fill('[data-testid="current-password"]', 'testpassword');
    await page.fill('[data-testid="new-password"]', 'newpassword123');
    await page.fill('[data-testid="confirm-password"]', 'newpassword123');
    await page.click('[data-testid="update-password-button"]');

    // Verify password change
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Password updated successfully');
  });

  test('should display analytics dashboard', async ({ page }) => {
    // Navigate to analytics
    await page.click('[data-testid="analytics-nav"]');
    await expect(page.locator('[data-testid="analytics-page"]')).toBeVisible();

    // Verify dashboard components
    await expect(page.locator('[data-testid="total-leads-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="conversion-rate-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="active-agents-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="workflow-executions-chart"]')).toBeVisible();

    // Test date range filter
    await page.selectOption('[data-testid="date-range"]', 'last-30-days');
    await page.click('[data-testid="apply-filter-button"]');

    // Verify data is refreshed
    await expect(page.locator('[data-testid="analytics-loading"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="total-leads-card"]')).toBeVisible();
  });

  test('should handle real-time notifications', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    
    // Wait for notifications to load
    await expect(page.locator('[data-testid="notifications-panel"]')).toBeVisible();

    // Check for existing notifications
    const notificationCount = await page.locator('[data-testid="notification-item"]').count();
    
    // Simulate a new notification (this would typically come from WebSocket)
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('notification', {
        detail: {
          id: 'test-notification',
          title: 'Test Notification',
          message: 'This is a test notification',
          type: 'info',
          timestamp: new Date().toISOString()
        }
      }));
    });

    // Verify notification appears
    await expect(page.locator('[data-testid="notification-item"]')).toHaveCount(notificationCount + 1);
    await expect(page.locator('[data-testid="notification-title"]')).toContainText('Test Notification');
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Navigate to a page that might have errors
    await page.goto('http://localhost:3000/ai-agents');
    
    // Simulate network error by intercepting requests
    await page.route('**/api/ai-agents', route => route.abort());
    
    // Try to load agents
    await page.reload();
    
    // Verify error handling
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
    
    // Test retry functionality
    await page.unroute('**/api/ai-agents');
    await page.click('[data-testid="retry-button"]');
    
    // Should load successfully after retry
    await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to application
    await page.goto('http://localhost:3000');
    
    // Verify mobile navigation
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible();
    
    // Test mobile workflow
    await page.click('[data-testid="mobile-nav-ai-agents"]');
    await expect(page.locator('[data-testid="ai-agents-page"]')).toBeVisible();
    
    // Verify mobile layout
    await expect(page.locator('[data-testid="mobile-agent-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-create-button"]')).toBeVisible();
  });
});
