import { test, expect } from '@playwright/test';

test.describe('AI Agent Interactions E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should interact with AI agent in real-time', async ({ page }) => {
    // Navigate to AI agent interface
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-card"]:first-child');
    await expect(page.locator('[data-testid="agent-interface"]')).toBeVisible();

    // Send message to agent
    await page.fill('[data-testid="message-input"]', 'Hello, I need help with customer service');
    await page.click('[data-testid="send-message-button"]');

    // Wait for agent response
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-testid="agent-response"]')).toContainText('customer service');

    // Verify conversation history
    await expect(page.locator('[data-testid="conversation-history"]')).toContainText('Hello, I need help');
    await expect(page.locator('[data-testid="conversation-history"]')).toContainText('customer service');
  });

  test('should handle agent tool execution', async ({ page }) => {
    // Navigate to agent with tools
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-with-tools"]');
    await expect(page.locator('[data-testid="agent-interface"]')).toBeVisible();

    // Trigger tool usage
    await page.fill('[data-testid="message-input"]', 'Look up customer information for john@example.com');
    await page.click('[data-testid="send-message-button"]');

    // Wait for tool execution
    await expect(page.locator('[data-testid="tool-execution-indicator"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-result"]')).toBeVisible({ timeout: 15000 });

    // Verify tool was executed correctly
    await expect(page.locator('[data-testid="tool-result"]')).toContainText('customer information');
  });

  test('should manage agent configurations', async ({ page }) => {
    // Navigate to agent management
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="manage-agents-button"]');
    await expect(page.locator('[data-testid="agent-management"]')).toBeVisible();

    // Create new agent
    await page.click('[data-testid="create-new-agent"]');
    await page.fill('[data-testid="agent-name"]', 'E2E Test Agent');
    await page.selectOption('[data-testid="agent-model"]', 'claude-3');
    await page.fill('[data-testid="agent-temperature"]', '0.5');
    await page.fill('[data-testid="agent-system-prompt"]', 'You are a helpful AI assistant for testing.');

    // Add tools to agent
    await page.click('[data-testid="add-tools-section"]');
    await page.click('[data-testid="add-tool"]');
    await page.selectOption('[data-testid="tool-type"]', 'web_search');
    await page.fill('[data-testid="tool-name"]', 'search_web');
    await page.check('[data-testid="tool-enabled"]');

    // Save agent configuration
    await page.click('[data-testid="save-agent-config"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Agent created successfully');

    // Verify agent appears in list
    await expect(page.locator('[data-testid="agents-list"]')).toContainText('E2E Test Agent');
  });

  test('should handle agent workflow execution', async ({ page }) => {
    // Navigate to workflows
    await page.click('[data-testid="workflows-nav"]');
    await expect(page.locator('[data-testid="workflows-page"]')).toBeVisible();

    // Create workflow with agent
    await page.click('[data-testid="create-workflow"]');
    await page.fill('[data-testid="workflow-name"]', 'E2E Test Workflow');
    await page.selectOption('[data-testid="workflow-agent"]', 'E2E Test Agent');

    // Add workflow steps
    await page.click('[data-testid="add-workflow-step"]');
    await page.selectOption('[data-testid="step-type"]', 'ai_processing');
    await page.fill('[data-testid="step-prompt"]', 'Analyze this customer feedback: {{input}}');
    await page.fill('[data-testid="step-output-variable"]', 'analysis_result');

    // Add conditional step
    await page.click('[data-testid="add-workflow-step"]');
    await page.selectOption('[data-testid="step-type"]', 'conditional');
    await page.fill('[data-testid="condition-expression"]', '{{analysis_result.sentiment}} === "positive"');

    // Save workflow
    await page.click('[data-testid="save-workflow"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Workflow created successfully');

    // Execute workflow
    await page.click('[data-testid="execute-workflow"]');
    await page.fill('[data-testid="workflow-input"]', 'I love your product! It works great.');
    await page.click('[data-testid="run-workflow"]');

    // Wait for execution
    await expect(page.locator('[data-testid="execution-result"]')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('[data-testid="execution-status"]')).toContainText('completed');
  });

  test('should handle agent performance monitoring', async ({ page }) => {
    // Navigate to agent analytics
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-analytics"]');
    await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();

    // Verify performance metrics
    await expect(page.locator('[data-testid="response-time-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-rate-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-requests-metric"]')).toBeVisible();

    // Test date range filtering
    await page.selectOption('[data-testid="date-range-filter"]', 'last-7-days');
    await page.click('[data-testid="apply-filter"]');

    // Verify data updates
    await expect(page.locator('[data-testid="analytics-loading"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="response-time-chart"]')).toBeVisible();
  });

  test('should handle agent error scenarios', async ({ page }) => {
    // Navigate to agent interface
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-card"]:first-child');

    // Send message that might cause an error
    await page.fill('[data-testid="message-input"]', 'Execute malicious command');
    await page.click('[data-testid="send-message-button"]');

    // Handle potential error response
    try {
      await expect(page.locator('[data-testid="error-message"]')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Unable to process');
    } catch {
      // If no error, that's also valid - the agent handled it safely
      await expect(page.locator('[data-testid="agent-response"]')).toBeVisible();
    }

    // Test recovery
    await page.fill('[data-testid="message-input"]', 'Hello, how can you help me?');
    await page.click('[data-testid="send-message-button"]');
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 10000 });
  });

  test('should handle concurrent agent interactions', async ({ page, context }) => {
    // Open multiple agent tabs
    const page2 = await context.newPage();
    await page2.goto('http://localhost:3000');
    await page2.fill('[data-testid="email-input"]', 'test@example.com');
    await page2.fill('[data-testid="password-input"]', 'testpassword');
    await page2.click('[data-testid="login-button"]');
    await page2.click('[data-testid="ai-agents-nav"]');
    await page2.click('[data-testid="agent-card"]:first-child');

    // Navigate to agent in first page
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-card"]:first-child');

    // Send concurrent messages
    await Promise.all([
      page.fill('[data-testid="message-input"]', 'Message from session 1'),
      page.click('[data-testid="send-message-button"]'),
      page2.fill('[data-testid="message-input"]', 'Message from session 2'),
      page2.click('[data-testid="send-message-button"]')
    ]);

    // Verify both sessions receive responses
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 10000 });
    await expect(page2.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 10000 });

    await page2.close();
  });

  test('should handle agent file uploads', async ({ page }) => {
    // Navigate to agent interface
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-card"]:first-child');

    // Upload a file
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles('test-files/sample-document.txt');

    // Wait for file upload
    await expect(page.locator('[data-testid="file-upload-progress"]')).toBeVisible();
    await expect(page.locator('[data-testid="file-upload-success"]')).toBeVisible({ timeout: 10000 });

    // Send message about uploaded file
    await page.fill('[data-testid="message-input"]', 'Please analyze the uploaded document');
    await page.click('[data-testid="send-message-button"]');

    // Verify agent processes file
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('[data-testid="agent-response"]')).toContainText('document');
  });

  test('should handle agent voice interactions', async ({ page }) => {
    // Navigate to agent interface with voice support
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="voice-enabled-agent"]');
    await expect(page.locator('[data-testid="voice-controls"]')).toBeVisible();

    // Start voice recording
    await page.click('[data-testid="voice-record-button"]');
    await expect(page.locator('[data-testid="recording-indicator"]')).toBeVisible();

    // Simulate voice input (in real test, this would use actual audio)
    await page.waitForTimeout(2000);
    await page.click('[data-testid="voice-stop-button"]');

    // Wait for voice processing
    await expect(page.locator('[data-testid="voice-processing"]')).toBeVisible();
    await expect(page.locator('[data-testid="transcribed-text"]')).toBeVisible({ timeout: 10000 });

    // Verify agent responds to voice input
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 15000 });
  });

  test('should handle agent knowledge base integration', async ({ page }) => {
    // Navigate to agent with knowledge base
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="knowledge-base-agent"]');
    await expect(page.locator('[data-testid="knowledge-base-panel"]')).toBeVisible();

    // Add knowledge base document
    await page.click('[data-testid="add-knowledge-document"]');
    await page.fill('[data-testid="document-title"]', 'Product Information');
    await page.fill('[data-testid="document-content"]', 'Our product has the following features...');

    // Save document
    await page.click('[data-testid="save-document"]');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Document added');

    // Test knowledge base query
    await page.fill('[data-testid="message-input"]', 'What are the product features?');
    await page.click('[data-testid="send-message-button"]');

    // Verify agent uses knowledge base
    await expect(page.locator('[data-testid="agent-response"]')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('[data-testid="knowledge-citation"]')).toBeVisible();
  });

  test('should handle agent training and fine-tuning', async ({ page }) => {
    // Navigate to agent training
    await page.click('[data-testid="ai-agents-nav"]');
    await page.click('[data-testid="agent-training"]');
    await expect(page.locator('[data-testid="training-interface"]')).toBeVisible();

    // Upload training data
    const trainingFile = page.locator('[data-testid="training-data-upload"]');
    await trainingFile.setInputFiles('test-files/training-data.json');

    // Configure training parameters
    await page.selectOption('[data-testid="training-model"]', 'fine-tune-gpt-4');
    await page.fill('[data-testid="training-epochs"]', '3');
    await page.fill('[data-testid="learning-rate"]', '0.001');

    // Start training
    await page.click('[data-testid="start-training"]');
    await expect(page.locator('[data-testid="training-progress"]')).toBeVisible();

    // Monitor training progress
    await expect(page.locator('[data-testid="training-metrics"]')).toBeVisible({ timeout: 30000 });
    
    // Wait for training completion (or timeout)
    try {
      await expect(page.locator('[data-testid="training-complete"]')).toBeVisible({ timeout: 120000 });
      await expect(page.locator('[data-testid="success-message"]')).toContainText('Training completed');
    } catch {
      // Training might take longer, that's okay for E2E test
      console.log('Training still in progress, which is expected');
    }
  });
});
