import { test, expect, Page, BrowserContext, beforeAll, afterAll, beforeEach } from '@playwright/test';

test.describe('User Workflows E2E Tests', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.goto('http://localhost:3000');
  });

  test.describe('User Registration and Login Flow', () => {
    test('should complete full user registration and login workflow', async () => {
      // Navigate to registration page
      await page.click('[data-testid="register-button"]');
      await expect(page).toHaveURL(/.*\/register/);

      // Fill registration form
      await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.fill('[data-testid="firstName-input"]', 'E2E');
      await page.fill('[data-testid="lastName-input"]', 'Test');
      await page.fill('[data-testid="organization-input"]', 'E2E Test Organization');

      // Submit registration
      await page.click('[data-testid="register-submit-button"]');

      // Should redirect to dashboard
      await expect(page).toHaveURL(/.*\/dashboard/);
      await expect(page.locator('[data-testid="welcome-message"]')).toContainText('Welcome, E2E Test');

      // Logout
      await page.click('[data-testid="user-menu"]');
      await page.click('[data-testid="logout-button"]');

      // Should redirect to login page
      await expect(page).toHaveURL(/.*\/login/);

      // Login with registered user
      await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.click('[data-testid="login-submit-button"]');

      // Should redirect to dashboard
      await expect(page).toHaveURL(/.*\/dashboard/);
      await expect(page.locator('[data-testid="welcome-message"]')).toContainText('Welcome, E2E Test');
    });

    test('should handle login with invalid credentials', async () => {
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'invalid@example.com');
      await page.fill('[data-testid="password-input"]', 'WrongPassword123!');
      await page.click('[data-testid="login-submit-button"]');

      // Should show error message
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
      await expect(page).toHaveURL(/.*\/login/);
    });

    test('should handle password reset flow', async () => {
      await page.click('[data-testid="login-button"]');
      await page.click('[data-testid="forgot-password-link"]');

      await expect(page).toHaveURL(/.*\/forgot-password/);
      
      await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
      await page.click('[data-testid="reset-password-button"]');

      // Should show success message
      await expect(page.locator('[data-testid="success-message"]')).toContainText('Password reset email sent');
    });
  });

  test.describe('AI Agent Interaction Workflow', () => {
    test.beforeEach(async () => {
      // Login before each AI agent test
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.click('[data-testid="login-submit-button"]');
      await page.waitForURL(/.*\/dashboard/);
    });

    test('should create and interact with AI agent', async () => {
      // Navigate to AI agents page
      await page.click('[data-testid="ai-agents-nav"]');
      await expect(page).toHaveURL(/.*\/ai-agents/);

      // Create new AI agent
      await page.click('[data-testid="create-agent-button"]');
      await expect(page).toHaveURL(/.*\/ai-agents\/create/);

      // Fill agent configuration
      await page.fill('[data-testid="agent-name-input"]', 'E2E Test Agent');
      await page.selectOption('[data-testid="industry-select"]', 'healthcare');
      await page.selectOption('[data-testid="purpose-select"]', 'customer_service');
      await page.fill('[data-testid="agent-description"]', 'Test agent for E2E testing');

      // Submit agent creation
      await page.click('[data-testid="create-agent-submit"]');

      // Should redirect to agent configuration page
      await expect(page).toHaveURL(/.*\/ai-agents\/[a-zA-Z0-9-]+/);
      await expect(page.locator('[data-testid="agent-name"]')).toContainText('E2E Test Agent');

      // Start conversation with agent
      await page.click('[data-testid="start-conversation-button"]');
      await expect(page.locator('[data-testid="conversation-interface"]')).toBeVisible();

      // Send message to agent
      await page.fill('[data-testid="message-input"]', 'Hello, I need help with a customer inquiry');
      await page.click('[data-testid="send-message-button"]');

      // Should show user message
      await expect(page.locator('[data-testid="user-message"]')).toContainText('Hello, I need help with a customer inquiry');

      // Wait for agent response
      await page.waitForSelector('[data-testid="agent-message"]', { timeout: 10000 });
      await expect(page.locator('[data-testid="agent-message"]')).toBeVisible();

      // Verify conversation history
      await expect(page.locator('[data-testid="conversation-history"]')).toContainText('Hello, I need help with a customer inquiry');
    });

    test('should handle agent workflow configuration', async () => {
      // Navigate to existing agent
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');

      // Configure workflow
      await page.click('[data-testid="workflow-tab"]');
      await page.click('[data-testid="add-workflow-step-button"]');

      // Add input step
      await page.selectOption('[data-testid="step-type-select"]', 'input');
      await page.fill('[data-testid="step-name-input"]', 'Customer Greeting');
      await page.fill('[data-testid="step-prompt"]', 'Welcome! How can I help you today?');
      await page.click('[data-testid="save-step-button"]');

      // Add processing step
      await page.click('[data-testid="add-workflow-step-button"]');
      await page.selectOption('[data-testid="step-type-select"]', 'processing');
      await page.fill('[data-testid="step-name-input"]', 'Intent Analysis');
      await page.fill('[data-testid="step-prompt"]', 'Analyze customer intent and categorize the request');
      await page.click('[data-testid="save-step-button"]');

      // Test workflow
      await page.click('[data-testid="test-workflow-button"]');
      await page.fill('[data-testid="test-input"]', 'I want to check my order status');
      await page.click('[data-testid="run-test-button"]');

      // Should show test results
      await expect(page.locator('[data-testid="test-results"]')).toBeVisible();
      await expect(page.locator('[data-testid="workflow-output"]')).toContainText('order status');
    });
  });

  test.describe('Payment and Billing Workflow', () => {
    test.beforeEach(async () => {
      // Login and navigate to billing
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
      await page.click('[data-testid="login-submit-button"]');
      await page.waitForURL(/.*\/dashboard/);
      await page.click('[data-testid="billing-nav"]');
    });

    test('should complete subscription upgrade workflow', async () => {
      // Navigate to subscription page
      await expect(page).toHaveURL(/.*\/billing\/subscription/);

      // View available plans
      await expect(page.locator('[data-testid="pricing-plans"]')).toBeVisible();
      
      // Select premium plan
      await page.click('[data-testid="plan-premium"]');
      await page.click('[data-testid="upgrade-plan-button"]');

      // Should show payment form
      await expect(page.locator('[data-testid="payment-form"]')).toBeVisible();

      // Fill payment details (using test card)
      await page.fill('[data-testid="card-number-input"]', '4242424242424242');
      await page.fill('[data-testid="card-expiry-input"]', '12/25');
      await page.fill('[data-testid="card-cvc-input"]', '123');
      await page.fill('[data-testid="card-name-input"]', 'E2E Test User');

      // Submit payment
      await page.click('[data-testid="submit-payment-button"]');

      // Should show success message
      await expect(page.locator('[data-testid="payment-success"]')).toContainText('Payment successful');
      
      // Should update plan status
      await expect(page.locator('[data-testid="current-plan"]')).toContainText('Premium');
      await expect(page.locator('[data-testid="subscription-status"]')).toContainText('Active');
    });

    test('should handle invoice viewing and payment', async () => {
      // Navigate to invoices page
      await page.click('[data-testid="invoices-nav"]');
      await expect(page).toHaveURL(/.*\/billing\/invoices/);

      // Click on first invoice
      await page.click('[data-testid="invoice-row"]:first-child');
      await expect(page.locator('[data-testid="invoice-details"]')).toBeVisible();

      // Verify invoice details
      await expect(page.locator('[data-testid="invoice-number"]')).toBeVisible();
      await expect(page.locator("[data-testid='invoice-amount']")).toBeVisible();
      await expect(page.locator('[data-testid="invoice-date"]')).toBeVisible();

      // Pay invoice
      await page.click('[data-testid="pay-invoice-button"]');
      await expect(page.locator('[data-testid="payment-form"]')).toBeVisible();

      // Use saved payment method
      await page.click('[data-testid="use-saved-payment"]');
      await page.click('[data-testid="confirm-payment-button"]');

      // Should show payment confirmation
      await expect(page.locator('[data-testid="payment-confirmation"]')).toContainText('Payment processed');
      
      // Invoice status should update
      await expect(page.locator('[data-testid="invoice-status"]')).toContainText('Paid');
    });
  });

  test.describe('Organization Management Workflow', () => {
    test.beforeEach(async () => {
      // Login as admin user
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'admin@example.com');
      await page.fill('[data-testid="password-input"]', 'AdminPassword123!');
      await page.click('[data-testid="login-submit-button"]');
      await page.waitForURL(/.*\/dashboard/);
    });

    test('should manage organization settings and users', async () => {
      // Navigate to organization settings
      await page.click('[data-testid="organization-nav"]');
      await expect(page).toHaveURL(/.*\/organization\/settings/);

      // Update organization details
      await page.click('[data-testid="edit-organization-button"]');
      await page.fill('[data-testid="organization-name-input"]', 'Updated E2E Test Organization');
      await page.fill('[data-testid="organization-email-input"]', 'updated@example.com');
      await page.click('[data-testid="save-organization-button"]');

      // Should show success message
      await expect(page.locator('[data-testid="success-message"]')).toContainText('Organization updated');

      // Navigate to team management
      await page.click('[data-testid="team-nav"]');
      await expect(page).toHaveURL(/.*\/organization\/team/);

      // Invite new team member
      await page.click('[data-testid="invite-member-button"]');
      await page.fill('[data-testid="member-email-input"]', 'newmember@example.com');
      await page.selectOption('[data-testid="member-role-select"]', 'member');
      await page.click('[data-testid="send-invitation-button"]');

      // Should show invitation sent message
      await expect(page.locator('[data-testid="invitation-success"]')).toContainText('Invitation sent');

      // Verify member appears in team list
      await expect(page.locator('[data-testid="team-member-list"]')).toContainText('newmember@example.com');
    });

    test('should handle role-based access control', async () => {
      // Test admin access
      await page.click('[data-testid="organization-nav"]');
      await expect(page.locator('[data-testid="admin-only-section"]')).toBeVisible();

      // Logout and login as regular member
      await page.click('[data-testid="user-menu"]');
      await page.click('[data-testid="logout-button"]');
      
      await page.fill('[data-testid="email-input"]', 'member@example.com');
      await page.fill('[data-testid="password-input"]', 'MemberPassword123!');
      await page.click('[data-testid="login-submit-button"]');
      await page.waitForURL(/.*\/dashboard/);

      // Navigate to organization
      await page.click('[data-testid="organization-nav"]');
      
      // Admin sections should not be visible
      await expect(page.locator('[data-testid="admin-only-section"]')).not.toBeVisible();
      
      // Member should see limited options
      await expect(page.locator('[data-testid="member-section"]')).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle network errors gracefully', async () => {
      // Simulate network offline
      await page.context().setOffline(true);

      // Try to perform action that requires network
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'password123');
      await page.click('[data-testid="login-submit-button"]');

      // Should show network error message
      await expect(page.locator('[data-testid="network-error"]')).toContainText('Network error');

      // Restore network
      await page.context().setOffline(false);

      // Retry should work
      await page.click('[data-testid="retry-button"]');
      await expect(page.locator('[data-testid="network-error"]')).not.toBeVisible();
    });

    test('should handle session timeout', async () => {
      // Login
      await page.click('[data-testid="login-button"]');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'password123');
      await page.click('[data-testid="login-submit-button"]');
      await page.waitForURL(/.*\/dashboard/);

      // Clear session storage to simulate timeout
      await page.evaluate(() => {
        sessionStorage.clear();
        localStorage.clear();
      });

      // Try to access protected route
      await page.click('[data-testid="protected-link"]');

      // Should redirect to login
      await expect(page).toHaveURL(/.*\/login/);
      await expect(page.locator('[data-testid="session-timeout-message"]')).toContainText('Session expired');
    });

    test('should handle form validation errors', async () => {
      await page.click('[data-testid="register-button"]');

      // Submit empty form
      await page.click('[data-testid="register-submit-button"]');

      // Should show validation errors
      await expect(page.locator('[data-testid="email-error"]')).toContainText('Email is required');
      await expect(page.locator('[data-testid="password-error"]')).toContainText('Password is required');
      await expect(page.locator('[data-testid="firstName-error"]')).toContainText('First name is required');

      // Fill with invalid data
      await page.fill('[data-testid="email-input"]', 'invalid-email');
      await page.fill('[data-testid="password-input"]', '123');
      await page.click('[data-testid="register-submit-button"]');

      // Should show specific validation errors
      await expect(page.locator('[data-testid="email-error"]')).toContainText('Invalid email format');
      await expect(page.locator('[data-testid="password-error"]')).toContainText('Password must be at least 8 characters');
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should load pages within performance thresholds', async () => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3000/dashboard');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });

    test('should meet accessibility standards', async () => {
      // Run accessibility checks
      await page.goto('http://localhost:3000/dashboard');
      
      // Check for proper heading structure
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
      expect(headings).toBeGreaterThan(0);

      // Check for alt text on images
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);

      // Check for proper form labels
      const inputsWithoutLabels = await page.locator('input:not([aria-label]):not([aria-labelledby])').count();
      const labels = await page.locator('label').count();
      expect(inputsWithoutLabels).toBeLessThanOrEqual(labels);
    });

    test('should be responsive on different viewports', async () => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000/dashboard');
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();

      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('[data-testid="full-navigation"]')).toBeVisible();
    });
  });
});
