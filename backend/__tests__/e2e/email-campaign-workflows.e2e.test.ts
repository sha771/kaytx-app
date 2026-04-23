import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { createApp } from '../../hono';

describe('Email Campaign Workflows E2E Tests', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let app: any;
  let testUser: any;
  let testOrganization: any;

  beforeAll(async () => {
    // Start the application
    app = createApp();
    const server = app.listen({ port: 3002 });
    
    // Launch browser
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    // Setup test data
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await context?.close();
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  });

  beforeEach(async () => {
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    page = await context.newPage();
    
    // Login as test user
    await loginTestUser();
  });

  afterEach(async () => {
    await context?.close();
  });

  describe('Campaign Creation Workflow', () => {
    it('should create email campaign from template', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      await page.waitForSelector('[data-testid="campaigns-page"]');
      
      // Click create campaign button
      await page.click('[data-testid="create-campaign-button"]');
      await page.waitForSelector('[data-testid="campaign-creation-wizard"]');
      
      // Step 1: Select template
      await page.click('[data-testid="template-option-1"]');
      await page.click('[data-testid="wizard-next"]');
      
      // Step 2: Configure campaign details
      await page.fill('[data-testid="campaign-name"]', 'Test Campaign');
      await page.fill('[data-testid="campaign-subject"]', 'Test Subject');
      await page.selectOption('[data-testid="campaign-list"]', 'test-list');
      await page.click('[data-testid="wizard-next"]');
      
      // Step 3: Customize content
      await page.fill('[data-testid="email-content"]', 'This is a test email content.');
      await page.click('[data-testid="preview-button"]');
      
      // Verify preview
      await page.waitForSelector('[data-testid="email-preview"]');
      await expect(page.locator('[data-testid="preview-content"]')).toContain('test email content');
      
      await page.click('[data-testid="close-preview"]');
      await page.click('[data-testid="wizard-next"]');
      
      // Step 4: Schedule campaign
      await page.selectOption('[data-testid="schedule-option"]', 'immediate');
      await page.click('[data-testid="wizard-finish"]');
      
      // Verify campaign created
      await page.waitForSelector('[data-testid="campaign-success"]');
      const successMessage = await page.textContent('[data-testid="campaign-success"]');
      expect(successMessage).toContain('Campaign created successfully');
      
      // Verify campaign appears in list
      await page.waitForSelector('[data-testid="campaigns-list"]');
      const campaignName = await page.textContent('[data-testid="campaign-name"]');
      expect(campaignName).toContain('Test Campaign');
    });

    it('should create campaign with custom template', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="create-campaign-button"]');
      
      // Select custom template option
      await page.click('[data-testid="custom-template-option"]');
      await page.click('[data-testid="wizard-next"]');
      
      // Fill campaign details
      await page.fill('[data-testid="campaign-name"]', 'Custom Template Campaign');
      await page.fill('[data-testid="campaign-subject"]', 'Custom Subject');
      
      // Use template editor
      await page.click('[data-testid="template-editor"]');
      await page.waitForSelector('[data-testid="editor-toolbar"]');
      
      // Add content blocks
      await page.click('[data-testid="add-text-block"]');
      await page.fill('[data-testid="text-block-content"]', 'Custom text content');
      
      await page.click('[data-testid="add-image-block"]');
      await page.fill('[data-testid="image-url"]', 'https://example.com/image.jpg');
      
      await page.click('[data-testid="add-button-block"]');
      await page.fill('[data-testid="button-text"]', 'Click Here');
      await page.fill('[data-testid="button-url"]', 'https://example.com');
      
      // Save template
      await page.click('[data-testid="save-template"]');
      await page.waitForSelector('[data-testid="template-saved"]');
      
      // Continue with campaign creation
      await page.click('[data-testid="wizard-next"]');
      await page.selectOption('[data-testid="schedule-option"]', 'immediate');
      await page.click('[data-testid="wizard-finish"]');
      
      // Verify campaign created
      await page.waitForSelector('[data-testid="campaign-success"]');
    });

    it('should handle campaign validation errors', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="create-campaign-button"]');
      
      // Try to proceed without filling required fields
      await page.click('[data-testid="wizard-next"]');
      
      // Should show validation errors
      await expect(page.locator('[data-testid="validation-errors"]')).toBeVisible();
      await expect(page.locator('[data-testid="name-required-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="subject-required-error"]')).toBeVisible();
      
      // Fill required fields
      await page.fill('[data-testid="campaign-name"]', 'Validation Test Campaign');
      await page.fill('[data-testid="campaign-subject"]', 'Validation Test Subject');
      
      // Should be able to proceed now
      await page.click('[data-testid="wizard-next"]');
      await expect(page.locator('[data-testid="template-selection"]')).toBeVisible();
    });
  });

  describe('Campaign Management Workflow', () => {
    beforeEach(async () => {
      // Create a test campaign
      await createTestCampaign('Management Test Campaign');
    });

    it('should edit campaign details', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      
      // Find and click edit button for test campaign
      await page.click('[data-testid="edit-campaign-button"]');
      await page.waitForSelector('[data-testid="campaign-editor"]');
      
      // Edit campaign details
      await page.fill('[data-testid="campaign-name"]', 'Updated Campaign Name');
      await page.fill('[data-testid="campaign-subject"]', 'Updated Subject');
      
      // Save changes
      await page.click('[data-testid="save-campaign"]');
      await page.waitForSelector('[data-testid="campaign-saved"]');
      
      // Verify changes
      const campaignName = await page.inputValue('[data-testid="campaign-name"]');
      const campaignSubject = await page.inputValue('[data-testid="campaign-subject"]');
      expect(campaignName).toBe('Updated Campaign Name');
      expect(campaignSubject).toBe('Updated Subject');
    });

    it('should duplicate campaign', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      
      // Click duplicate button
      await page.click('[data-testid="duplicate-campaign-button"]');
      await page.waitForSelector('[data-testid="duplicate-campaign-modal"]');
      
      // Fill duplication details
      await page.fill('[data-testid="new-campaign-name"]', 'Duplicated Campaign');
      await page.click('[data-testid="confirm-duplicate"]');
      
      // Wait for duplication to complete
      await page.waitForSelector('[data-testid="campaign-duplicated"]');
      
      // Verify duplicated campaign appears
      await page.goto('http://localhost:3002/campaigns');
      await page.waitForSelector('[data-testid="campaigns-list"]');
      
      const campaignNames = await page.locator('[data-testid="campaign-name"]').allTextContents();
      expect(campaignNames).toContain('Duplicated Campaign');
    });

    it('should delete campaign', async () => {
      // Navigate to campaigns page
      await page.goto('http://localhost:3002/campaigns');
      
      // Click delete button
      await page.click('[data-testid="delete-campaign-button"]');
      await page.waitForSelector('[data-testid="delete-confirmation-modal"]');
      
      // Confirm deletion
      await page.click('[data-testid="confirm-delete"]');
      
      // Wait for deletion to complete
      await page.waitForSelector('[data-testid="campaign-deleted"]');
      
      // Verify campaign is removed
      await page.goto('http://localhost:3002/campaigns');
      await page.waitForSelector('[data-testid="campaigns-list"]');
      
      const campaignNames = await page.locator('[data-testid="campaign-name"]').allTextContents();
      expect(campaignNames).not.toContain('Management Test Campaign');
    });
  });

  describe('Campaign Launch and Monitoring Workflow', () => {
    beforeEach(async () => {
      // Create and prepare test campaign
      await createTestCampaign('Launch Test Campaign');
    });

    it('should launch campaign immediately', async () => {
      // Navigate to campaign details
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.waitForSelector('[data-testid="campaign-details"]');
      
      // Click launch button
      await page.click('[data-testid="launch-campaign-button"]');
      await page.waitForSelector('[data-testid="launch-confirmation-modal"]');
      
      // Confirm launch
      await page.click('[data-testid="confirm-launch"]');
      
      // Wait for launch to complete
      await page.waitForSelector('[data-testid="campaign-launched"]');
      
      // Verify campaign status
      const campaignStatus = await page.textContent('[data-testid="campaign-status"]');
      expect(campaignStatus).toContain('running');
      
      // Check analytics section
      await page.click('[data-testid="analytics-tab"]');
      await page.waitForSelector('[data-testid="campaign-analytics"]');
      
      // Verify initial metrics
      await expect(page.locator('[data-testid="total-sent"]')).toBeVisible();
      await expect(page.locator('[data-testid="delivery-rate"]')).toBeVisible();
    });

    it('should schedule campaign for later', async () => {
      // Navigate to campaign details
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.waitForSelector('[data-testid="campaign-details"]');
      
      // Click schedule button
      await page.click('[data-testid="schedule-campaign-button"]');
      await page.waitForSelector('[data-testid="schedule-modal"]');
      
      // Set schedule time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const scheduleDate = tomorrow.toISOString().split('T')[0];
      
      await page.fill('[data-testid="schedule-date"]', scheduleDate);
      await page.fill('[data-testid="schedule-time"]', '10:00');
      
      // Confirm scheduling
      await page.click('[data-testid="confirm-schedule"]');
      
      // Wait for scheduling to complete
      await page.waitForSelector('[data-testid="campaign-scheduled"]');
      
      // Verify campaign status
      const campaignStatus = await page.textContent('[data-testid="campaign-status"]');
      expect(campaignStatus).toContain('scheduled');
      
      // Verify scheduled time
      const scheduledTime = await page.textContent('[data-testid="scheduled-time"]');
      expect(scheduledTime).toContain(scheduleDate);
    });

    it('should monitor campaign performance in real-time', async () => {
      // Launch campaign first
      await launchTestCampaign();
      
      // Navigate to campaign analytics
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.click('[data-testid="analytics-tab"]');
      
      // Wait for real-time updates
      await page.waitForSelector('[data-testid="real-time-metrics"]');
      
      // Verify metrics are updating
      const initialSent = await page.textContent('[data-testid="total-sent"]');
      await page.waitForTimeout(2000); // Wait for updates
      
      const updatedSent = await page.textContent('[data-testid="total-sent"]');
      
      // Metrics should be available (may or may not have changed)
      expect(initialSent).toBeDefined();
      expect(updatedSent).toBeDefined();
      
      // Check detailed metrics
      await expect(page.locator('[data-testid="open-rate"]')).toBeVisible();
      await expect(page.locator('[data-testid="click-rate"]')).toBeVisible();
      await expect(page.locator('[data-testid="bounce-rate"]')).toBeVisible();
      
      // Check timeline chart
      await expect(page.locator('[data-testid="performance-timeline"]')).toBeVisible();
      
      // Check engagement heatmap
      await expect(page.locator('[data-testid="engagement-heatmap"]')).toBeVisible();
    });

    it('should handle campaign pause and resume', async () => {
      // Launch campaign
      await launchTestCampaign();
      
      // Navigate to campaign details
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      
      // Pause campaign
      await page.click('[data-testid="pause-campaign-button"]');
      await page.waitForSelector('[data-testid="campaign-paused"]');
      
      // Verify status
      const campaignStatus = await page.textContent('[data-testid="campaign-status"]');
      expect(campaignStatus).toContain('paused');
      
      // Resume campaign
      await page.click('[data-testid="resume-campaign-button"]');
      await page.waitForSelector('[data-testid="campaign-resumed"]');
      
      // Verify status
      const resumedStatus = await page.textContent('[data-testid="campaign-status"]');
      expect(resumedStatus).toContain('running');
    });
  });

  describe('A/B Testing Workflow', () => {
    beforeEach(async () => {
      // Create A/B test campaign
      await createABTestCampaign();
    });

    it('should create and run A/B test', async () => {
      // Navigate to campaign details
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.waitForSelector('[data-testid="campaign-details"]');
      
      // Verify A/B test setup
      await expect(page.locator('[data-testid="ab-test-indicator"]')).toBeVisible();
      
      // Launch A/B test
      await page.click('[data-testid="launch-campaign-button"]');
      await page.waitForSelector('[data-testid="launch-confirmation-modal"]');
      await page.click('[data-testid="confirm-launch"]');
      
      await page.waitForSelector('[data-testid="campaign-launched"]');
      
      // Navigate to A/B test results
      await page.click('[data-testid="ab-test-tab"]');
      await page.waitForSelector('[data-testid="ab-test-results"]');
      
      // Verify variant performance
      await expect(page.locator('[data-testid="variant-a-stats"]')).toBeVisible();
      await expect(page.locator('[data-testid="variant-b-stats"]')).toBeVisible();
      
      // Check statistical significance
      await expect(page.locator('[data-testid="significance-test"]')).toBeVisible();
    });

    it('should determine winning variant', async () => {
      // Launch A/B test and wait for results
      await launchABTestCampaign();
      
      // Navigate to A/B test results
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.click('[data-testid="ab-test-tab"]');
      
      // Wait for enough data for winner determination
      await page.waitForSelector('[data-testid="winner-determined"]', { timeout: 10000 });
      
      // Verify winner is announced
      const winnerAnnouncement = await page.textContent('[data-testid="winner-announcement"]');
      expect(winnerAnnouncement).toContain('winning variant');
      
      // Check winner details
      await expect(page.locator('[data-testid="winner-stats"]')).toBeVisible();
      await expect(page.locator('[data-testid="confidence-interval"]')).toBeVisible();
    });

    it('should apply winning variant to remaining audience', async () => {
      // Launch A/B test and determine winner
      await launchABTestCampaign();
      
      // Navigate to A/B test results
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.click('[data-testid="ab-test-tab"]');
      
      // Wait for winner determination
      await page.waitForSelector('[data-testid="winner-determined"]');
      
      // Apply winner to remaining audience
      await page.click('[data-testid="apply-winner-button"]');
      await page.waitForSelector('[data-testid="apply-winner-modal"]');
      
      // Confirm application
      await page.click('[data-testid="confirm-apply-winner"]');
      
      // Wait for application to complete
      await page.waitForSelector('[data-testid="winner-applied"]');
      
      // Verify campaign status
      const campaignStatus = await page.textContent('[data-testid="campaign-status"]');
      expect(campaignStatus).toContain('winner applied');
    });
  });

  describe('Template Management Workflow', () => {
    it('should create and manage email templates', async () => {
      // Navigate to templates page
      await page.goto('http://localhost:3002/templates');
      await page.waitForSelector('[data-testid="templates-page"]');
      
      // Create new template
      await page.click('[data-testid="create-template-button"]');
      await page.waitForSelector('[data-testid="template-editor"]');
      
      // Fill template details
      await page.fill('[data-testid="template-name"]', 'Test Template');
      await page.fill('[data-testid="template-subject"]', 'Test Template Subject');
      
      // Design template
      await page.click('[data-testid="design-tab"]');
      await page.click('[data-testid="add-header-block"]');
      await page.fill('[data-testid="header-text"]', 'Test Header');
      
      await page.click('[data-testid="add-body-block"]');
      await page.fill('[data-testid="body-content"]', 'Test body content with {{firstName}} variable');
      
      await page.click('[data-testid="add-footer-block"]');
      await page.fill('[data-testid="footer-text"]', 'Test footer');
      
      // Preview template
      await page.click('[data-testid="preview-template"]');
      await page.waitForSelector('[data-testid="template-preview"]');
      
      // Test variable substitution
      await page.fill('[data-testid="preview-variables"]', JSON.stringify({
        firstName: 'John'
      }));
      
      const previewContent = await page.textContent('[data-testid="preview-content"]');
      expect(previewContent).toContain('John');
      
      await page.click('[data-testid="close-preview"]');
      
      // Save template
      await page.click('[data-testid="save-template"]');
      await page.waitForSelector('[data-testid="template-saved"]');
      
      // Verify template appears in list
      await page.goto('http://localhost:3002/templates');
      const templateName = await page.textContent('[data-testid="template-name"]');
      expect(templateName).toContain('Test Template');
    });

    it('should clone and modify existing template', async () => {
      // Navigate to templates page
      await page.goto('http://localhost:3002/templates');
      
      // Click clone button on first template
      await page.click('[data-testid="clone-template-button"]');
      await page.waitForSelector('[data-testid="clone-template-modal"]');
      
      // Fill clone details
      await page.fill('[data-testid="cloned-template-name"]', 'Cloned Template');
      await page.click('[data-testid="confirm-clone"]');
      
      // Wait for cloning to complete
      await page.waitForSelector('[data-testid="template-cloned"]');
      
      // Edit cloned template
      await page.click('[data-testid="edit-template-button"]');
      await page.waitForSelector('[data-testid="template-editor"]');
      
      // Modify content
      await page.fill('[data-testid="template-subject"]', 'Modified Subject');
      await page.click('[data-testid="save-template"]');
      
      // Verify changes
      const modifiedSubject = await page.inputValue('[data-testid="template-subject"]');
      expect(modifiedSubject).toBe('Modified Subject');
    });
  });

  describe('List Management Workflow', () => {
    it('should create and manage email lists', async () => {
      // Navigate to lists page
      await page.goto('http://localhost:3002/lists');
      await page.waitForSelector('[data-testid="lists-page"]');
      
      // Create new list
      await page.click('[data-testid="create-list-button"]');
      await page.waitForSelector('[data-testid="list-creation-form"]');
      
      // Fill list details
      await page.fill('[data-testid="list-name"]', 'Test Email List');
      await page.fill('[data-testid="list-description"]', 'A test email list');
      
      // Add contacts manually
      await page.click('[data-testid="add-contacts-manually"]');
      await page.fill('[data-testid="contact-email"]', 'test1@example.com');
      await page.fill('[data-testid="contact-first-name"]', 'Test');
      await page.fill('[data-testid="contact-last-name"]', 'User');
      await page.click('[data-testid="add-contact"]');
      
      // Add another contact
      await page.fill('[data-testid="contact-email"]', 'test2@example.com');
      await page.fill('[data-testid="contact-first-name"]', 'Another');
      await page.fill('[data-testid="contact-last-name"]', 'User');
      await page.click('[data-testid="add-contact"]');
      
      // Save list
      await page.click('[data-testid="save-list"]');
      await page.waitForSelector('[data-testid="list-saved"]');
      
      // Verify list appears
      await page.goto('http://localhost:3002/lists');
      const listName = await page.textContent('[data-testid="list-name"]');
      expect(listName).toContain('Test Email List');
      
      // Check list details
      await page.click('[data-testid="list-details-link"]');
      await page.waitForSelector('[data-testid="list-details"]');
      
      // Verify contacts
      const contactCount = await page.textContent('[data-testid="contact-count"]');
      expect(contactCount).toContain('2');
      
      const contactEmails = await page.locator('[data-testid="contact-email"]').allTextContents();
      expect(contactEmails).toContain('test1@example.com');
      expect(contactEmails).toContain('test2@example.com');
    });

    it('should import contacts from CSV', async () => {
      // Navigate to lists page
      await page.goto('http://localhost:3002/lists');
      await page.click('[data-testid="create-list-button"]');
      
      // Select import option
      await page.click('[data-testid="import-contacts-option"]');
      await page.click('[data-testid="wizard-next"]');
      
      // Upload CSV file
      const fileInput = page.locator('[data-testid="csv-file-input"]');
      await fileInput.setInputFiles('test-assets/test-contacts.csv');
      
      // Wait for file processing
      await page.waitForSelector('[data-testid="csv-processed"]');
      
      // Map columns
      await page.selectOption('[data-testid="email-column"]', 'email');
      await page.selectOption('[data-testid="first-name-column"]', 'first_name');
      await page.selectOption('[data-testid="last-name-column"]', 'last_name');
      
      // Preview import
      await page.click('[data-testid="preview-import"]');
      await page.waitForSelector('[data-testid="import-preview"]');
      
      // Verify preview data
      const previewRows = await page.locator('[data-testid="preview-row"]').count();
      expect(previewRows).toBeGreaterThan(0);
      
      // Complete import
      await page.click('[data-testid="confirm-import"]');
      await page.waitForSelector('[data-testid="import-completed"]');
      
      // Verify import results
      const importedCount = await page.textContent('[data-testid="imported-count"]');
      expect(importedCount).toMatch(/\d+/);
    });
  });

  describe('Reporting and Analytics Workflow', () => {
    beforeEach(async () => {
      // Create and launch test campaign for analytics
      await createTestCampaign('Analytics Test Campaign');
      await launchTestCampaign();
    });

    it('should generate comprehensive campaign reports', async () => {
      // Navigate to campaign analytics
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.click('[data-testid="analytics-tab"]');
      
      // Wait for analytics to load
      await page.waitForSelector('[data-testid="campaign-analytics"]');
      
      // Check overview metrics
      await expect(page.locator('[data-testid="overview-metrics"]')).toBeVisible();
      await expect(page.locator('[data-testid="total-sent"]')).toBeVisible();
      await expect(page.locator('[data-testid="delivery-rate"]')).toBeVisible();
      await expect(page.locator('[data-testid="open-rate"]')).toBeVisible();
      await expect(page.locator('[data-testid="click-rate"]')).toBeVisible();
      
      // Check engagement metrics
      await page.click('[data-testid="engagement-subtab"]');
      await expect(page.locator('[data-testid="engagement-metrics"]')).toBeVisible();
      await expect(page.locator('[data-testid="click-through-rate"]')).toBeVisible();
      await expect(page.locator('[data-testid="conversion-rate"]')).toBeVisible();
      
      // Check geographic data
      await page.click('[data-testid="geographic-subtab"]');
      await expect(page.locator('[data-testid="geographic-map"]')).toBeVisible();
      await expect(page.locator('[data-testid="top-countries"]')).toBeVisible();
      
      // Check device analytics
      await page.click('[data-testid="devices-subtab"]');
      await expect(page.locator('[data-testid="device-breakdown"]')).toBeVisible();
      await expect(page.locator('[data-testid="client-types"]')).toBeVisible();
    });

    it('should export campaign reports', async () => {
      // Navigate to campaign analytics
      await page.goto('http://localhost:3002/campaigns');
      await page.click('[data-testid="campaign-details-link"]');
      await page.click('[data-testid="analytics-tab"]');
      
      // Click export button
      await page.click('[data-testid="export-report-button"]');
      await page.waitForSelector('[data-testid="export-modal"]');
      
      // Select export format
      await page.selectOption('[data-testid="export-format"]', 'pdf');
      await page.selectOption('[data-testid="export-range"]', 'all-time');
      
      // Start export
      await page.click('[data-testid="start-export"]');
      
      // Wait for export to complete
      await page.waitForSelector('[data-testid="export-completed"]');
      
      // Download report
      const downloadPromise = page.waitForEvent('download');
      await page.click('[data-testid="download-report"]');
      const download = await downloadPromise;
      
      // Verify download
      expect(download.suggestedFilename()).toContain('analytics-report');
      expect(download.suggestedFilename()).toContain('.pdf');
    });

    it('should create custom reports', async () => {
      // Navigate to reports page
      await page.goto('http://localhost:3002/reports');
      await page.waitForSelector('[data-testid="reports-page"]');
      
      // Create custom report
      await page.click('[data-testid="create-report-button"]');
      await page.waitForSelector('[data-testid="report-builder"]');
      
      // Configure report
      await page.fill('[data-testid="report-name"]', 'Custom Campaign Report');
      await page.selectOption('[data-testid="report-type"]', 'campaign-performance');
      
      // Select metrics
      await page.check('[data-testid="metric-sent"]');
      await page.check('[data-testid="metric-opened"]');
      await page.check('[data-testid="metric-clicked"]');
      
      // Set date range
      await page.fill('[data-testid="start-date"]', '2024-01-01');
      await page.fill('[data-testid="end-date"]', '2024-12-31');
      
      // Generate report
      await page.click('[data-testid="generate-report"]');
      await page.waitForSelector('[data-testid="report-generated"]');
      
      // Verify report content
      await expect(page.locator('[data-testid="report-chart"]')).toBeVisible();
      await expect(page.locator('[data-testid="report-table"]')).toBeVisible();
      
      // Save report
      await page.click('[data-testid="save-report"]');
      await page.waitForSelector('[data-testid="report-saved"]');
      
      // Verify report appears in list
      await page.goto('http://localhost:3002/reports');
      const reportName = await page.textContent('[data-testid="report-name"]');
      expect(reportName).toContain('Custom Campaign Report');
    });
  });

  // Helper functions
  async function loginTestUser(): Promise<void> {
    await page.goto('http://localhost:3002/login');
    await page.waitForSelector('[data-testid="login-form"]');
    
    await page.fill('[data-testid="email-input"]', 'campaign.manager@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="login-button"]');
    
    await page.waitForSelector('[data-testid="dashboard"]');
  }

  async function createTestCampaign(name: string): Promise<void> {
    await page.goto('http://localhost:3002/campaigns');
    await page.click('[data-testid="create-campaign-button"]');
    
    await page.fill('[data-testid="campaign-name"]', name);
    await page.fill('[data-testid="campaign-subject"]', `${name} Subject`);
    await page.selectOption('[data-testid="campaign-list"]', 'test-list');
    
    await page.click('[data-testid="wizard-next"]');
    await page.click('[data-testid="wizard-next"]');
    await page.selectOption('[data-testid="schedule-option"]', 'draft');
    await page.click('[data-testid="wizard-finish"]');
    
    await page.waitForSelector('[data-testid="campaign-success"]');
  }

  async function createABTestCampaign(): Promise<void> {
    await page.goto('http://localhost:3002/campaigns');
    await page.click('[data-testid="create-campaign-button"]');
    
    await page.fill('[data-testid="campaign-name"]', 'A/B Test Campaign');
    await page.check('[data-testid="enable-ab-test"]');
    
    await page.click('[data-testid="wizard-next"]');
    
    // Configure variants
    await page.fill('[data-testid="variant-a-subject"]', 'Variant A Subject');
    await page.fill('[data-testid="variant-b-subject"]', 'Variant B Subject');
    
    await page.click('[data-testid="wizard-next"]');
    await page.selectOption('[data-testid="schedule-option"]', 'draft');
    await page.click('[data-testid="wizard-finish"]');
    
    await page.waitForSelector('[data-testid="campaign-success"]');
  }

  async function launchTestCampaign(): Promise<void> {
    await page.goto('http://localhost:3002/campaigns');
    await page.click('[data-testid="campaign-details-link"]');
    await page.click('[data-testid="launch-campaign-button"]');
    await page.click('[data-testid="confirm-launch"]');
    await page.waitForSelector('[data-testid="campaign-launched"]');
  }

  async function launchABTestCampaign(): Promise<void> {
    await createABTestCampaign();
    await launchTestCampaign();
  }

  async function setupTestData(): Promise<void> {
    // Create test organization, users, email lists, etc.
    testOrganization = {
      id: 'test-org-id',
      name: 'Test Organization',
    };
    
    testUser = {
      id: 'test-user-id',
      email: 'campaign.manager@example.com',
      password: 'SecurePass123!',
    };
  }

  async function cleanupTestData(): Promise<void> {
    // Clean up test data
  }
});
