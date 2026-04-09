import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { createApp } from '../../hono';

describe('User Workflows E2E Tests', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let app: any;

  beforeAll(async () => {
    // Start the application
    app = createApp();
    const server = app.listen({ port: 3001 });
    
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
    
    // Setup page error handling
    page.on('pageerror', (error) => {
      console.error('Page error:', error);
    });
    
    page.on('requestfailed', (request) => {
      console.error('Request failed:', request.url(), request.failure()?.errorText);
    });
  });

  afterEach(async () => {
    await context?.close();
  });

  describe('User Registration and Login Flow', () => {
    it('should complete full user registration workflow', async () => {
      // Navigate to registration page
      await page.goto('http://localhost:3001/register');
      
      // Wait for page to load
      await page.waitForSelector('[data-testid="registration-form"]');
      
      // Fill registration form
      await page.fill('[data-testid="email-input"]', 'john.doe@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePass123!');
      await page.fill('[data-testid="confirm-password-input"]', 'SecurePass123!');
      await page.fill('[data-testid="first-name-input"]', 'John');
      await page.fill('[data-testid="last-name-input"]', 'Doe');
      await page.fill('[data-testid="organization-name-input"]', 'Test Organization');
      
      // Accept terms
      await page.check('[data-testid="terms-checkbox"]');
      
      // Submit registration
      await page.click('[data-testid="register-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="registration-success"]');
      
      // Verify success message
      const successMessage = await page.textContent('[data-testid="registration-success"]');
      expect(successMessage).toContain('Registration successful');
      
      // Should redirect to login page
      await page.waitForURL('**/login');
      
      // Verify email verification notice
      const verificationNotice = await page.textContent('[data-testid="verification-notice"]');
      expect(verificationNotice).toContain('verification email');
    });

    it('should handle login and dashboard navigation', async () => {
      // First register a user
      await registerTestUser('test.user@example.com', 'SecurePass123!');
      
      // Navigate to login page
      await page.goto('http://localhost:3001/login');
      
      // Fill login form
      await page.fill('[data-testid="email-input"]', 'test.user@example.com');
      await page.fill('[data-testid="password-input"]', 'SecurePass123!');
      
      // Submit login
      await page.click('[data-testid="login-button"]');
      
      // Wait for dashboard to load
      await page.waitForSelector('[data-testid="dashboard"]');
      
      // Verify dashboard elements
      await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
      await expect(page.locator('[data-testid="navigation-menu"]')).toBeVisible();
      await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
      
      // Verify user info
      const welcomeMessage = await page.textContent('[data-testid="welcome-message"]');
      expect(welcomeMessage).toContain('Test User');
    });

    it('should handle password reset flow', async () => {
      // Navigate to login page
      await page.goto('http://localhost:3001/login');
      
      // Click forgot password link
      await page.click('[data-testid="forgot-password-link"]');
      
      // Wait for password reset form
      await page.waitForSelector('[data-testid="password-reset-form"]');
      
      // Fill email
      await page.fill('[data-testid="email-input"]', 'test.user@example.com');
      
      // Submit reset request
      await page.click('[data-testid="reset-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="reset-success"]');
      
      // Verify success message
      const successMessage = await page.textContent('[data-testid="reset-success"]');
      expect(successMessage).toContain('reset link sent');
    });

    it('should handle login failures gracefully', async () => {
      // Navigate to login page
      await page.goto('http://localhost:3001/login');
      
      // Fill invalid credentials
      await page.fill('[data-testid="email-input"]', 'test.user@example.com');
      await page.fill('[data-testid="password-input"]', 'wrongpassword');
      
      // Submit login
      await page.click('[data-testid="login-button"]');
      
      // Wait for error message
      await page.waitForSelector('[data-testid="login-error"]');
      
      // Verify error message
      const errorMessage = await page.textContent('[data-testid="login-error"]');
      expect(errorMessage).toContain('Invalid credentials');
      
      // Should stay on login page
      expect(page.url()).toContain('/login');
    });
  });

  describe('User Profile Management Flow', () => {
    beforeEach(async () => {
      // Login before each test
      await loginTestUser('profile.user@example.com', 'SecurePass123!');
    });

    it('should update user profile information', async () => {
      // Navigate to profile page
      await page.click('[data-testid="profile-link"]');
      await page.waitForSelector('[data-testid="profile-form"]');
      
      // Update profile information
      await page.fill('[data-testid="first-name-input"]', 'Updated');
      await page.fill('[data-testid="last-name-input"]', 'Name');
      await page.fill('[data-testid="phone-input"]', '+1234567890');
      
      // Submit update
      await page.click('[data-testid="update-profile-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="profile-update-success"]');
      
      // Verify updated information
      const firstName = await page.inputValue('[data-testid="first-name-input"]');
      const lastName = await page.inputValue('[data-testid="last-name-input"]');
      expect(firstName).toBe('Updated');
      expect(lastName).toBe('Name');
    });

    it('should change user password', async () => {
      // Navigate to security settings
      await page.click('[data-testid="security-link"]');
      await page.waitForSelector('[data-testid="security-form"]');
      
      // Fill password change form
      await page.fill('[data-testid="current-password-input"]', 'SecurePass123!');
      await page.fill('[data-testid="new-password-input"]', 'NewSecurePass456!');
      await page.fill('[data-testid="confirm-new-password-input"]', 'NewSecurePass456!');
      
      // Submit password change
      await page.click('[data-testid="change-password-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="password-change-success"]');
      
      // Verify success message
      const successMessage = await page.textContent('[data-testid="password-change-success"]');
      expect(successMessage).toContain('Password changed successfully');
      
      // Test login with new password
      await page.click('[data-testid="logout-link"]');
      await page.waitForSelector('[data-testid="login-form"]');
      
      await page.fill('[data-testid="email-input"]', 'profile.user@example.com');
      await page.fill('[data-testid="password-input"]', 'NewSecurePass456!');
      await page.click('[data-testid="login-button"]');
      
      // Should successfully login
      await page.waitForSelector('[data-testid="dashboard"]');
    });

    it('should upload profile picture', async () => {
      // Navigate to profile page
      await page.click('[data-testid="profile-link"]');
      await page.waitForSelector('[data-testid="profile-form"]');
      
      // Upload profile picture
      const fileInput = page.locator('[data-testid="profile-picture-input"]');
      await fileInput.setInputFiles('test-assets/test-profile-picture.jpg');
      
      // Wait for upload preview
      await page.waitForSelector('[data-testid="profile-picture-preview"]');
      
      // Save profile picture
      await page.click('[data-testid="save-picture-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="picture-upload-success"]');
      
      // Verify picture is displayed
      const profilePicture = page.locator('[data-testid="profile-picture"]');
      await expect(profilePicture).toBeVisible();
    });
  });

  describe('Organization Management Flow', () => {
    beforeEach(async () => {
      // Login as admin user
      await loginTestUser('admin.user@example.com', 'SecurePass123!');
    });

    it('should create and manage organization', async () => {
      // Navigate to organization management
      await page.click('[data-testid="organization-link"]');
      await page.waitForSelector('[data-testid="organization-form"]');
      
      // Create new organization
      await page.click('[data-testid="create-organization-button"]');
      await page.fill('[data-testid="org-name-input"]', 'New Test Organization');
      await page.fill('[data-testid="org-slug-input"]', 'new-test-org');
      await page.fill('[data-testid="org-description-input"]', 'A test organization');
      
      // Submit creation
      await page.click('[data-testid="create-org-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="org-creation-success"]');
      
      // Verify organization appears in list
      await page.waitForSelector('[data-testid="organization-list"]');
      const orgName = await page.textContent('[data-testid="org-name"]');
      expect(orgName).toContain('New Test Organization');
    });

    it('should manage organization members', async () => {
      // Navigate to organization members
      await page.click('[data-testid="organization-link"]');
      await page.click('[data-testid="members-tab"]');
      await page.waitForSelector('[data-testid="members-list"]');
      
      // Invite new member
      await page.click('[data-testid="invite-member-button"]');
      await page.fill('[data-testid="member-email-input"]', 'new.member@example.com');
      await page.selectOption('[data-testid="member-role-select"]', 'user');
      
      // Send invitation
      await page.click('[data-testid="send-invitation-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="invitation-sent-success"]');
      
      // Verify invitation appears in list
      const invitationEmail = await page.textContent('[data-testid="invitation-email"]');
      expect(invitationEmail).toContain('new.member@example.com');
    });

    it('should update organization settings', async () => {
      // Navigate to organization settings
      await page.click('[data-testid="organization-link"]');
      await page.click('[data-testid="settings-tab"]');
      await page.waitForSelector('[data-testid="settings-form"]');
      
      // Update settings
      await page.check('[data-testid="enable-two-factor"]');
      await page.selectOption('[data-testid="default-role-select"]', 'user');
      await page.fill('[data-testid="session-timeout-input"]', '60');
      
      // Save settings
      await page.click('[data-testid="save-settings-button"]');
      
      // Wait for success message
      await page.waitForSelector('[data-testid="settings-saved-success"]');
      
      // Verify settings are saved
      const twoFactorEnabled = await page.isChecked('[data-testid="enable-two-factor"]');
      expect(twoFactorEnabled).toBe(true);
    });
  });

  describe('User Dashboard and Navigation Flow', () => {
    beforeEach(async () => {
      await loginTestUser('dashboard.user@example.com', 'SecurePass123!');
    });

    it('should navigate between dashboard sections', async () => {
      // Start at dashboard
      await page.waitForSelector('[data-testid="dashboard"]');
      
      // Navigate to different sections
      const sections = [
        { link: '[data-testid="analytics-link"]', selector: '[data-testid="analytics-page"]' },
        { link: '[data-testid="reports-link"]', selector: '[data-testid="reports-page"]' },
        { link: '[data-testid="settings-link"]', selector: '[data-testid="settings-page"]' },
      ];
      
      for (const section of sections) {
        await page.click(section.link);
        await page.waitForSelector(section.selector);
        
        // Verify section is loaded
        await expect(page.locator(section.selector)).toBeVisible();
      }
    });

    it('should display real-time notifications', async () => {
      // Start at dashboard
      await page.waitForSelector('[data-testid="dashboard"]');
      
      // Wait for notifications to load
      await page.waitForSelector('[data-testid="notification-center"]');
      
      // Click notification center
      await page.click('[data-testid="notification-center"]');
      
      // Verify notifications are displayed
      await expect(page.locator('[data-testid="notification-list"]')).toBeVisible();
      
      // Check if there are notifications
      const notifications = await page.locator('[data-testid="notification-item"]');
      const count = await notifications.count();
      
      if (count > 0) {
        // Click first notification
        await notifications.first().click();
        
        // Verify notification details
        await expect(page.locator('[data-testid="notification-details"]')).toBeVisible();
      }
    });

    it('should handle search functionality', async () => {
      // Navigate to search page
      await page.click('[data-testid="search-link"]');
      await page.waitForSelector('[data-testid="search-form"]');
      
      // Perform search
      await page.fill('[data-testid="search-input"]', 'test');
      await page.click('[data-testid="search-button"]');
      
      // Wait for search results
      await page.waitForSelector('[data-testid="search-results"]');
      
      // Verify search results
      const results = await page.locator('[data-testid="search-result-item"]');
      const resultCount = await results.count();
      
      if (resultCount > 0) {
        // Click first result
        await results.first().click();
        
        // Verify result page loads
        await expect(page.locator('[data-testid="result-page"]')).toBeVisible();
      }
    });

    it('should handle responsive design', async () => {
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify mobile navigation
      await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
      
      // Open mobile menu
      await page.click('[data-testid="mobile-menu-button"]');
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
      
      // Navigate through mobile menu
      await page.click('[data-testid="mobile-profile-link"]');
      await expect(page.locator('[data-testid="profile-page"]')).toBeVisible();
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Verify tablet layout
      await expect(page.locator('[data-testid="tablet-navigation"]')).toBeVisible();
    });
  });

  describe('User Session Management Flow', () => {
    it('should handle session timeout', async () => {
      // Login user
      await loginTestUser('session.user@example.com', 'SecurePass123!');
      
      // Wait for dashboard
      await page.waitForSelector('[data-testid="dashboard"]');
      
      // Simulate session timeout by clearing cookies
      await context.clearCookies();
      
      // Try to access protected page
      await page.goto('http://localhost:3001/dashboard');
      
      // Should redirect to login
      await page.waitForSelector('[data-testid="login-form"]');
      expect(page.url()).toContain('/login');
      
      // Should show session timeout message
      const timeoutMessage = await page.textContent('[data-testid="session-timeout-message"]');
      expect(timeoutMessage).toContain('session expired');
    });

    it('should handle concurrent sessions', async () => {
      // Create second browser context
      const context2 = await browser.newContext();
      const page2 = await context2.newPage();
      
      // Login in first browser
      await loginTestUser('concurrent.user@example.com', 'SecurePass123!');
      
      // Login in second browser
      await page2.goto('http://localhost:3001/login');
      await page2.fill('[data-testid="email-input"]', 'concurrent.user@example.com');
      await page2.fill('[data-testid="password-input"]', 'SecurePass123!');
      await page2.click('[data-testid="login-button"]');
      await page2.waitForSelector('[data-testid="dashboard"]');
      
      // Verify both sessions are active
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await expect(page2.locator('[data-testid="dashboard"]')).toBeVisible();
      
      // Logout from second browser
      await page2.click('[data-testid="logout-link"]');
      await page2.waitForSelector('[data-testid="login-form"]');
      
      // First browser should still be active (depending on session policy)
      await page.reload();
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      
      await context2.close();
    });

    it('should handle logout properly', async () => {
      // Login user
      await loginTestUser('logout.user@example.com', 'SecurePass123!');
      
      // Logout
      await page.click('[data-testid="logout-link"]');
      
      // Wait for login page
      await page.waitForSelector('[data-testid="login-form"]');
      
      // Verify cookies are cleared
      const cookies = await context.cookies();
      expect(cookies.filter(c => c.name === 'auth-token')).toHaveLength(0);
      
      // Try to access protected page
      await page.goto('http://localhost:3001/dashboard');
      
      // Should redirect to login
      await page.waitForSelector('[data-testid="login-form"]');
      expect(page.url()).toContain('/login');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle network errors gracefully', async () => {
      // Login user
      await loginTestUser('network.user@example.com', 'SecurePass123!');
      
      // Simulate network failure by going offline
      await context.setOffline(true);
      
      // Try to perform action that requires network
      await page.click('[data-testid="profile-link"]');
      
      // Should show network error message
      await page.waitForSelector('[data-testid="network-error"]', { timeout: 5000 });
      
      const errorMessage = await page.textContent('[data-testid="network-error"]');
      expect(errorMessage).toContain('network error');
      
      // Go back online
      await context.setOffline(false);
      
      // Should recover automatically
      await page.reload();
      await expect(page.locator('[data-testid="profile-form"]')).toBeVisible();
    });

    it('should handle form validation errors', async () => {
      // Navigate to registration page
      await page.goto('http://localhost:3001/register');
      
      // Submit empty form
      await page.click('[data-testid="register-button"]');
      
      // Should show validation errors
      await expect(page.locator('[data-testid="validation-errors"]')).toBeVisible();
      
      // Check specific field errors
      await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    });

    it('should handle large file uploads', async () => {
      // Login user
      await loginTestUser('upload.user@example.com', 'SecurePass123!');
      
      // Navigate to file upload page
      await page.click('[data-testid="files-link"]');
      await page.waitForSelector('[data-testid="upload-form"]');
      
      // Try to upload large file (simulate)
      const fileInput = page.locator('[data-testid="file-input"]');
      
      // Monitor upload progress
      await page.waitForSelector('[data-testid="upload-progress"]');
      
      // Should show file size error for too large files
      await page.waitForSelector('[data-testid="file-size-error"]', { timeout: 5000 });
      
      const sizeError = await page.textContent('[data-testid="file-size-error"]');
      expect(sizeError).toContain('file size');
    });

    it('should handle browser back button properly', async () => {
      // Login user
      await loginTestUser('browser.user@example.com', 'SecurePass123!');
      
      // Navigate through multiple pages
      await page.click('[data-testid="profile-link"]');
      await page.waitForSelector('[data-testid="profile-form"]');
      
      await page.click('[data-testid="settings-link"]');
      await page.waitForSelector('[data-testid="settings-form"]');
      
      // Use browser back button
      await page.goBack();
      
      // Should return to profile page
      await expect(page.locator('[data-testid="profile-form"]')).toBeVisible();
      
      // Go back again
      await page.goBack();
      
      // Should return to dashboard
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  // Helper functions
  async function registerTestUser(email: string, password: string): Promise<void> {
    await page.goto('http://localhost:3001/register');
    await page.waitForSelector('[data-testid="registration-form"]');
    
    await page.fill('[data-testid="email-input"]', email);
    await page.fill('[data-testid="password-input"]', password);
    await page.fill('[data-testid="confirm-password-input"]', password);
    await page.fill('[data-testid="first-name-input"]', 'Test');
    await page.fill('[data-testid="last-name-input"]', 'User');
    await page.fill('[data-testid="organization-name-input"]', 'Test Org');
    
    await page.check('[data-testid="terms-checkbox"]');
    await page.click('[data-testid="register-button"]');
    
    await page.waitForSelector('[data-testid="registration-success"]');
  }

  async function loginTestUser(email: string, password: string): Promise<void> {
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('[data-testid="login-form"]');
    
    await page.fill('[data-testid="email-input"]', email);
    await page.fill('[data-testid="password-input"]', password);
    await page.click('[data-testid="login-button"]');
    
    await page.waitForSelector('[data-testid="dashboard"]');
  }

  async function setupTestData(): Promise<void> {
    // Create test users, organizations, and data
    // This would typically involve API calls to set up test data
  }

  async function cleanupTestData(): Promise<void> {
    // Clean up test data
    // This would typically involve API calls to clean up test data
  }
});
