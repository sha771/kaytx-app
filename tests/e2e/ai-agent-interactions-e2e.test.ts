import { test, expect, Page, BrowserContext, beforeAll, afterAll, beforeEach } from '@playwright/test';

test.describe('AI Agent Interactions E2E Tests', () => {
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
    // Login for each test
    await page.click('[data-testid="login-button"]');
    await page.fill('[data-testid="email-input"]', 'e2e-test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePassword123!');
    await page.click('[data-testid="login-submit-button"]');
    await page.waitForURL(/.*\/dashboard/);
  });

  test.describe('AI Agent Creation and Configuration', () => {
    test('should create AI agent with complete configuration', async () => {
      // Navigate to AI agents
      await page.click('[data-testid="ai-agents-nav"]');
      await expect(page).toHaveURL(/.*\/ai-agents/);

      // Create new agent
      await page.click('[data-testid="create-agent-button"]');
      
      // Fill basic information
      await page.fill('[data-testid="agent-name-input"]', 'Customer Service Bot');
      await page.selectOption('[data-testid="industry-select"]', 'retail');
      await page.selectOption('[data-testid="purpose-select"]', 'customer_service');
      await page.fill('[data-testid="agent-description"]', 'Handles customer inquiries and support requests');

      // Configure personality
      await page.click('[data-testid="personality-tab"]');
      await page.selectOption('[data-testid="tone-select"]', 'professional');
      await page.selectOption('[data-testid="response-style-select"]', 'detailed');
      await page.fill('[data-testid="greeting-message"]', 'Hello! I\'m here to help you with any questions.');
      await page.fill('[data-testid="farewell-message"]', 'Thank you for contacting us. Have a great day!');

      // Configure capabilities
      await page.click('[data-testid="capabilities-tab"]');
      await page.check('[data-testid="capability-text-generation"]');
      await page.check('[data-testid="capability-sentiment-analysis"]');
      await page.check('[data-testid="capability-language-detection"]');

      // Submit agent creation
      await page.click('[data-testid="create-agent-submit"]');
      
      // Should redirect to agent page
      await expect(page).toHaveURL(/.*\/ai-agents\/[a-zA-Z0-9-]+/);
      await expect(page.locator('[data-testid="agent-name"]')).toContainText('Customer Service Bot');
      await expect(page.locator('[data-testid="agent-status"]')).toContainText('Active');
    });

    test('should handle agent validation errors', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="create-agent-button"]');

      // Try to submit without required fields
      await page.click('[data-testid="create-agent-submit"]');

      // Should show validation errors
      await expect(page.locator('[data-testid="name-error"]')).toContainText('Agent name is required');
      await expect(page.locator('[data-testid="industry-error"]')).toContainText('Industry is required');
      await expect(page.locator('[data-testid="purpose-error"]')).toContainText('Purpose is required');

      // Fill with invalid data
      await page.fill('[data-testid="agent-name-input"]', 'A'); // Too short
      await page.selectOption('[data-testid="industry-select"]', 'healthcare');
      await page.selectOption('[data-testid="purpose-select"]', 'sales');
      await page.click('[data-testid="create-agent-submit"]');

      // Should show specific validation error
      await expect(page.locator('[data-testid="name-error"]')).toContainText('Name must be at least 3 characters');
    });
  });

  test.describe('AI Agent Conversation Flow', () => {
    test('should handle complete conversation workflow', async () => {
      // Navigate to existing agent
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');

      // Start conversation
      await page.click('[data-testid="start-conversation-button"]');
      await expect(page.locator('[data-testid="conversation-interface"]')).toBeVisible();

      // Test initial greeting
      await expect(page.locator('[data-testid="agent-message"]')).toBeVisible();
      const initialGreeting = await page.locator('[data-testid="agent-message"]').textContent();
      expect(initialGreeting?.length).toBeGreaterThan(0);

      // Send first message
      await page.fill('[data-testid="message-input"]', 'Hi, I need help with my recent order');
      await page.click('[data-testid="send-message-button"]');

      // Verify user message appears
      await expect(page.locator('[data-testid="user-message"]')).toContainText('Hi, I need help with my recent order');

      // Wait for agent response
      await page.waitForSelector('[data-testid="agent-message"]:nth-child(2)', { timeout: 10000 });
      
      // Verify agent response is relevant
      const agentResponse = await page.locator('[data-testid="agent-message"]:nth-child(2)').textContent();
      expect(agentResponse?.toLowerCase()).toContain('order');

      // Continue conversation
      await page.fill('[data-testid="message-input"]', 'What\'s the status of order #12345?');
      await page.click('[data-testid="send-message-button"]');

      // Wait for detailed response
      await page.waitForSelector('[data-testid="agent-message"]:nth-child(3)', { timeout: 15000 });
      
      // Verify response contains order information
      const detailedResponse = await page.locator('[data-testid="agent-message"]:nth-child(3)').textContent();
      expect(detailedResponse?.toLowerCase()).toMatch(/order|12345|status/);

      // Test conversation features
      await expect(page.locator('[data-testid="conversation-timestamp"]')).toBeVisible();
      await expect(page.locator('[data-testid="message-status"]')).toBeVisible();
    });

    test('should handle conversation interruption and resumption', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Start conversation
      await page.fill('[data-testid="message-input"]', 'Hello, I have a question');
      await page.click('[data-testid="send-message-button"]');
      await page.waitForSelector('[data-testid="agent-message"]', { timeout: 10000 });

      // Navigate away
      await page.click('[data-testid="dashboard-nav"]');
      await expect(page).toHaveURL(/.*\/dashboard/);

      // Return to agent
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');

      // Should show conversation history
      await expect(page.locator('[data-testid="conversation-history"]')).toContainText('Hello, I have a question');
      await expect(page.locator('[data-testid="agent-message"]')).toBeVisible();

      // Continue conversation
      await page.fill('[data-testid="message-input"]', 'I\'m back, can you help me now?');
      await page.click('[data-testid="send-message-button"]');

      // Should get response
      await page.waitForSelector('[data-testid="agent-message"]:nth-child(2)', { timeout: 10000 });
    });

    test('should handle conversation export and sharing', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Have a conversation
      await page.fill('[data-testid="message-input"]', 'Test message for export');
      await page.click('[data-testid="send-message-button"]');
      await page.waitForSelector('[data-testid="agent-message"]', { timeout: 10000 });

      // Export conversation
      await page.click('[data-testid="conversation-options"]');
      await page.click('[data-testid="export-conversation"]');

      // Should show export modal
      await expect(page.locator('[data-testid="export-modal"]')).toBeVisible();
      
      // Select export format
      await page.selectOption('[data-testid="export-format"]', 'pdf');
      await page.click('[data-testid="export-submit"]');

      // Should show success message
      await expect(page.locator('[data-testid="export-success"]')).toContainText('Conversation exported');

      // Test sharing
      await page.click('[data-testid="conversation-options"]');
      await page.click('[data-testid="share-conversation"]');

      // Should show sharing modal
      await expect(page.locator('[data-testid="share-modal"]')).toBeVisible();
      
      // Copy share link
      await page.click('[data-testid="copy-link-button"]');
      await expect(page.locator('[data-testid="copy-success"]')).toContainText('Link copied');
    });
  });

  test.describe('AI Agent Workflow Testing', () => {
    test('should test custom agent workflow', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');

      // Navigate to workflow configuration
      await page.click('[data-testid="workflow-tab"]');
      await expect(page.locator('[data-testid="workflow-builder"]')).toBeVisible();

      // Test existing workflow
      await page.click('[data-testid="test-workflow-button"]');
      await expect(page.locator('[data-testid="workflow-test-interface"]')).toBeVisible();

      // Input test data
      await page.fill('[data-testid="test-input"]', 'Customer wants to return a defective product');
      await page.click('[data-testid="run-workflow-test"]');

      // Should show test results
      await page.waitForSelector('[data-testid="test-results"]', { timeout: 15000 });
      await expect(page.locator('[data-testid="workflow-output"]')).toBeVisible();
      await expect(page.locator('[data-testid="execution-time"]')).toBeVisible();

      // Verify workflow steps executed
      await expect(page.locator('[data-testid="step-1-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="step-2-result"]')).toBeVisible();
      await expect(page.locator('[data-testid="final-result"]')).toBeVisible();
    });

    test('should handle workflow error scenarios', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="workflow-tab"]');

      // Test with invalid input
      await page.click('[data-testid="test-workflow-button"]');
      await page.fill('[data-testid="test-input"]', ''); // Empty input
      await page.click('[data-testid="run-workflow-test"]');

      // Should show error
      await expect(page.locator('[data-testid="workflow-error"]')).toContainText('Input is required');

      // Test with malformed input
      await page.fill('[data-testid="test-input"]', 'x'.repeat(10000)); // Too long
      await page.click('[data-testid="run-workflow-test"]');

      // Should show validation error
      await expect(page.locator('[data-testid="workflow-error"]')).toContainText('Input too long');
    });
  });

  test.describe('AI Agent Analytics and Monitoring', () => {
    test('should display agent performance metrics', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');

      // Navigate to analytics
      await page.click('[data-testid="analytics-tab"]');
      await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();

      // Verify metrics are displayed
      await expect(page.locator('[data-testid="total-conversations"]')).toBeVisible();
      await expect(page.locator('[data-testid="average-response-time"]')).toBeVisible();
      await expect(page.locator('[data-testid="satisfaction-score"]')).toBeVisible();
      await expect(page.locator('[data-testid="resolution-rate"]')).toBeVisible();

      // Test time range selection
      await page.selectOption('[data-testid="time-range-select"]', '7d');
      await page.waitForTimeout(1000); // Wait for data to load

      // Verify metrics updated
      await expect(page.locator('[data-testid="metrics-updated"]')).toBeVisible();

      // Test detailed charts
      await expect(page.locator('[data-testid="conversation-chart"]')).toBeVisible();
      await expect(page.locator('[data-testid="response-time-chart"]')).toBeVisible();
      await expect(page.locator('[data-testid="sentiment-chart"]')).toBeVisible();
    });

    test('should handle conversation review and feedback', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="analytics-tab"]');

      // Navigate to conversation history
      await page.click('[data-testid="conversation-history-tab"]');
      await expect(page.locator('[data-testid="conversation-list"]')).toBeVisible();

      // Click on conversation to review
      await page.click('[data-testid="conversation-item"]:first-child');
      await expect(page.locator('[data-testid="conversation-review"]')).toBeVisible();

      // Add feedback
      await page.click('[data-testid="add-feedback-button"]');
      await page.selectOption('[data-testid="feedback-rating"]', '5');
      await page.fill('[data-testid="feedback-comment"]', 'Great response, very helpful!');
      await page.click('[data-testid="submit-feedback"]');

      // Should show feedback confirmation
      await expect(page.locator('[data-testid="feedback-success"]')).toContainText('Feedback submitted');

      // Verify feedback appears in conversation
      await expect(page.locator('[data-testid="feedback-item"]')).toContainText('Great response');
    });
  });

  test.describe('AI Agent Multi-language Support', () => {
    test('should handle conversations in different languages', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Test Spanish conversation
      await page.fill('[data-testid="message-input"]', 'Hola, necesito ayuda con mi pedido');
      await page.click('[data-testid="send-message-button"]');

      // Should detect language and respond appropriately
      await page.waitForSelector('[data-testid="agent-message"]', { timeout: 10000 });
      const spanishResponse = await page.locator('[data-testid="agent-message"]').textContent();
      expect(spanishResponse?.toLowerCase()).toMatch(/hola|pedido|ayuda/);

      // Test French conversation
      await page.fill('[data-testid="message-input"]', 'Bonjour, j\'ai besoin d\'aide');
      await page.click('[data-testid="send-message-button"]');

      await page.waitForSelector('[data-testid="agent-message"]:nth-child(2)', { timeout: 10000 });
      const frenchResponse = await page.locator('[data-testid="agent-message"]:nth-child(2)').textContent();
      expect(frenchResponse?.toLowerCase()).toMatch(/bonjour|aide|besoin/);

      // Verify language detection indicator
      await expect(page.locator('[data-testid="language-detected"]')).toBeVisible();
    });

    test('should handle language switching mid-conversation', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Start in English
      await page.fill('[data-testid="message-input"]', 'Hello, how are you?');
      await page.click('[data-testid="send-message-button"]');
      await page.waitForSelector('[data-testid="agent-message"]', { timeout: 10000 });

      // Switch to Spanish
      await page.fill('[data-testid="message-input"]', 'Ahora prefiero hablar en español');
      await page.click('[data-testid="send-message-button"]');

      // Should adapt to language change
      await page.waitForSelector('[data-testid="agent-message"]:nth-child(2)', { timeout: 10000 });
      const adaptedResponse = await page.locator('[data-testid="agent-message"]:nth-child(2)').textContent();
      expect(adaptedResponse?.toLowerCase()).toMatch(/español|spanish|idioma/);
    });
  });

  test.describe('AI Agent Error Handling and Edge Cases', () => {
    test('should handle agent unavailability gracefully', async () => {
      // Simulate agent being offline
      await page.route('**/api/agents/*/chat', route => {
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Agent temporarily unavailable' })
        });
      });

      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Try to send message
      await page.fill('[data-testid="message-input"]', 'Test message');
      await page.click('[data-testid="send-message-button"]');

      // Should show unavailability message
      await expect(page.locator('[data-testid="agent-unavailable"]')).toContainText('temporarily unavailable');
      await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
    });

    test('should handle conversation timeout', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Wait for timeout (simulate long inactivity)
      await page.waitForTimeout(30000); // 30 seconds

      // Try to send message
      await page.fill('[data-testid="message-input"]', 'Message after timeout');
      await page.click('[data-testid="send-message-button"]');

      // Should show timeout message
      await expect(page.locator('[data-testid="conversation-timeout"]')).toContainText('session expired');
      await expect(page.locator('[data-testid="restart-conversation"]')).toBeVisible();
    });

    test('should handle rate limiting', async () => {
      await page.click('[data-testid="ai-agents-nav"]');
      await page.click('[data-testid="agent-card"]:first-child');
      await page.click('[data-testid="start-conversation-button"]');

      // Send multiple messages rapidly
      for (let i = 0; i < 10; i++) {
        await page.fill('[data-testid="message-input"]', `Message ${i}`);
        await page.click('[data-testid="send-message-button"]');
        await page.waitForTimeout(100);
      }

      // Should show rate limiting message
      await expect(page.locator('[data-testid="rate-limited"]')).toContainText('too many requests');
      await expect(page.locator('[data-testid="rate-limit-timer"]')).toBeVisible();
    });
  });
});
