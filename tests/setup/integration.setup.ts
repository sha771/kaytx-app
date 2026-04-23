/**
 * Jest setup file for integration tests
 * Configures Testcontainers and database connections
 */

import type { StartedTestContainer } from 'testcontainers';
import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import type { StartedRedisContainer } from '@testcontainers/redis';

// Global test containers
let postgresContainer: StartedPostgreSqlContainer;
let redisContainer: StartedRedisContainer;
let rabbitmqContainer: StartedTestContainer;

const shouldEnableIntegrationContainers =
  String(process.env.ENABLE_INTEGRATION_CONTAINERS || '').toLowerCase() === 'true';

// Setup test containers before all integration tests
beforeAll(async () => {
  if (!shouldEnableIntegrationContainers) {
    console.warn('Skipping integration containers (set ENABLE_INTEGRATION_CONTAINERS=true to enable)');
    return;
  }

  console.log('Starting test containers...');

  let GenericContainer: any;
  let PostgreSqlContainer: any;
  let RedisContainer: any;

  try {
    ({ GenericContainer } = await import('testcontainers'));
    ({ PostgreSqlContainer } = await import('@testcontainers/postgresql'));
    ({ RedisContainer } = await import('@testcontainers/redis'));
  } catch (err) {
    console.warn('Testcontainers packages unavailable; skipping integration containers');
    return;
  }
  
  // Start PostgreSQL container
  try {
    postgresContainer = await new PostgreSqlContainer('postgres:15-alpine')
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .withExposedPorts(5432)
      .start();

    // Start Redis container
    redisContainer = await new RedisContainer('redis:7-alpine')
      .withExposedPorts(6379)
      .start();

    // Start RabbitMQ container
    rabbitmqContainer = await new GenericContainer('rabbitmq:3-management-alpine')
      .withExposedPorts(5672, 15672)
      .withEnvironment({
        RABBITMQ_DEFAULT_USER: 'test_user',
        RABBITMQ_DEFAULT_PASS: 'test_password',
      })
      .start();
  } catch (err) {
    console.warn('Failed to start integration containers; skipping integration containers');
    return;
  }

  // Set environment variables for tests
  process.env.TEST_DATABASE_URL = postgresContainer.getConnectionUri();
  process.env.TEST_REDIS_URL = `redis://${redisContainer.getHost()}:${redisContainer.getMappedPort(6379)}`;
  process.env.TEST_RABBITMQ_URL = `amqp://test_user:test_password@${rabbitmqContainer.getHost()}:${rabbitmqContainer.getMappedPort(5672)}`;
  
  console.log('Test containers started successfully');
}, 60000);

// Cleanup test containers after all integration tests
afterAll(async () => {
  if (!shouldEnableIntegrationContainers) return;

  console.log('Stopping test containers...');
  
  if (postgresContainer) {
    await postgresContainer.stop();
  }
  
  if (redisContainer) {
    await redisContainer.stop();
  }
  
  if (rabbitmqContainer) {
    await rabbitmqContainer.stop();
  }
  
  console.log('Test containers stopped');
}, 30000);

// Database cleanup between tests
afterEach(async () => {
  // Clean up test data between integration tests
  // This will be implemented per service as needed
});

// Export container references for use in tests
export {
  postgresContainer,
  redisContainer,
  rabbitmqContainer,
};