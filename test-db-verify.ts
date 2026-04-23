/**
 * Standalone test for test database functionality
 * Run with: npx ts-node test-db-verify.ts
 */

import { setupTestDatabase, clearTestDatabase, getTestUsers } from './backend/lib/test-database';

async function runTest() {
  console.log('Setting up test database...');
  const mockDb = setupTestDatabase();
  
  // Create a test user
  const testUser = {
    id: 'test-user-123',
    email: 'test@example.com',
    passwordHash: 'hashed-password',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    status: 'active'
  };

  console.log('Creating user...');
  const [createdUser] = await mockDb
    .insert({ name: 'users' })
    .values(testUser)
    .returning();

  console.log('Created user:', createdUser);

  // Retrieve the user by ID
  console.log('\nRetrieving user by ID...');
  const users = await mockDb
    .select()
    .from({ name: 'users' })
    .where({ 
      left: { name: 'id', column: { name: 'id' } }, 
      right: 'test-user-123' 
    })
    .limit(1);

  console.log('Retrieved users:', users);

  if (users.length === 1 && users[0].id === 'test-user-123') {
    console.log('\n✅ TEST PASSED: Test database is working correctly!');
  } else {
    console.log('\n❌ TEST FAILED: Could not retrieve user correctly');
    console.log('Available users in storage:', Array.from(getTestUsers().keys()));
  }

  clearTestDatabase();
}

runTest().catch(console.error);
