import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { setupTestDatabase, cleanupTestDatabase } from '../setup/integration.setup';

describe('Database Operations Integration Tests', () => {
  let postgresContainer: PostgreSqlContainer;
  let redisContainer: RedisContainer;
  let dbConnection: any;
  let redisClient: any;

  beforeAll(async () => {
    // Start test containers
    postgresContainer = await new PostgreSqlContainer()
      .withDatabase('test_db_ops')
      .withUsername('test')
      .withPassword('test')
      .start();

    redisContainer = await new RedisContainer()
      .start();

    // Setup database connections
    dbConnection = await setupTestDatabase(postgresContainer.getConnectionUri());
    redisClient = await redisContainer.getConnection();
  }, 60000);

  afterAll(async () => {
    await cleanupTestDatabase(dbConnection);
    await postgresContainer.stop();
    await redisContainer.stop();
  });

  beforeEach(async () => {
    // Clean up test data
    await dbConnection.query('TRUNCATE TABLE users, organizations, ai_agents, conversations CASCADE');
    await redisClient.flushdb();
  });

  describe('User Management Operations', () => {
    it('should create and retrieve user with all relations', async () => {
      // Create organization first
      const orgResult = await dbConnection.query(`
        INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING id
      `, ['test-org-id', 'Test Organization', 'test.com', 'enterprise']);

      const organizationId = orgResult.rows[0].id;

      // Create user
      const userResult = await dbConnection.query(`
        INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *
      `, [
        'test-user-id',
        'test@example.com',
        'hashed-password',
        organizationId,
        'admin',
        true
      ]);

      const user = userResult.rows[0];

      // Verify user creation
      expect(user.email).toBe('test@example.com');
      expect(user.organization_id).toBe(organizationId);
      expect(user.role).toBe('admin');
      expect(user.is_active).toBe(true);

      // Retrieve user with organization
      const retrievedUser = await dbConnection.query(`
        SELECT u.*, o.name as organization_name, o.domain as organization_domain
        FROM users u
        JOIN organizations o ON u.organization_id = o.id
        WHERE u.id = $1
      `, [user.id]);

      expect(retrievedUser.rows).toHaveLength(1);
      expect(retrievedUser.rows[0].organization_name).toBe('Test Organization');
      expect(retrievedUser.rows[0].organization_domain).toBe('test.com');
    });

    it('should handle concurrent user creation safely', async () => {
      const organizationId = 'test-org-id-concurrent';
      
      // Create organization
      await dbConnection.query(`
        INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
      `, [organizationId, 'Test Org', 'test.com', 'enterprise']);

      // Create multiple users concurrently
      const userPromises = Array.from({ length: 10 }, (_, i) => 
        dbConnection.query(`
          INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
          RETURNING id
        `, [
          `user-${i}`,
          `user${i}@example.com`,
          'hashed-password',
          organizationId,
          'user',
          true
        ])
      );

      const results = await Promise.all(userPromises);

      // Verify all users were created
      expect(results).toHaveLength(10);
      
      // Check for duplicates
      const userIds = results.map(result => result.rows[0].id);
      const uniqueIds = new Set(userIds);
      expect(uniqueIds.size).toBe(10);

      // Verify database consistency
      const countResult = await dbConnection.query(
        'SELECT COUNT(*) FROM users WHERE organization_id = $1',
        [organizationId]
      );
      expect(parseInt(countResult.rows[0].count)).toBe(10);
    });
  });

  describe('AI Agent Operations', () => {
    it('should create AI agent with workflow configuration', async () => {
      // Create organization and user
      const orgId = 'test-org-id-agent';
      const userId = 'test-user-id-agent';

      await dbConnection.query(`
        INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
      `, [orgId, 'Test Org', 'test.com', 'enterprise']);

      await dbConnection.query(`
        INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `, [userId, 'test@example.com', 'hashed-password', orgId, 'admin', true]);

      // Create AI agent
      const agentResult = await dbConnection.query(`
        INSERT INTO ai_agents (id, name, description, model, temperature, max_tokens, 
                              system_prompt, organization_id, created_by, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING *
      `, [
        'test-agent-id',
        'Customer Service Agent',
        'Handles customer inquiries',
        'gpt-4',
        0.7,
        2048,
        'You are a helpful customer service agent.',
        orgId,
        userId,
        true
      ]);

      const agent = agentResult.rows[0];

      // Verify agent creation
      expect(agent.name).toBe('Customer Service Agent');
      expect(agent.model).toBe('gpt-4');
      expect(agent.temperature).toBe(0.7);
      expect(agent.max_tokens).toBe(2048);
      expect(agent.organization_id).toBe(orgId);
      expect(agent.created_by).toBe(userId);
      expect(agent.is_active).toBe(true);

      // Create workflow for agent
      const workflowResult = await dbConnection.query(`
        INSERT INTO ai_workflows (id, agent_id, name, description, config, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *
      `, [
        'test-workflow-id',
        agent.id,
        'Customer Service Workflow',
        'Standard customer service process',
        JSON.stringify({
          steps: [
            { id: 'greeting', type: 'input', prompt: 'Greet the customer' },
            { id: 'inquiry', type: 'processing', prompt: 'Understand customer needs' },
            { id: 'resolution', type: 'output', prompt: 'Provide solution' }
          ]
        })
      ]);

      const workflow = workflowResult.rows[0];
      expect(workflow.agent_id).toBe(agent.id);
      expect(JSON.parse(workflow.config).steps).toHaveLength(3);
    });

    it('should handle agent conversation lifecycle', async () => {
      // Setup test data
      const orgId = 'test-org-id-conversation';
      const userId = 'test-user-id-conversation';
      const agentId = 'test-agent-id-conversation';

      await dbConnection.query(`
        INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
      `, [orgId, 'Test Org', 'test.com', 'enterprise']);

      await dbConnection.query(`
        INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `, [userId, 'test@example.com', 'hashed-password', orgId, 'admin', true]);

      await dbConnection.query(`
        INSERT INTO ai_agents (id, name, description, model, temperature, max_tokens, 
                              system_prompt, organization_id, created_by, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      `, [agentId, 'Test Agent', 'Test Description', 'gpt-4', 0.7, 2048, 
          'You are a test agent.', orgId, userId, true]);

      // Create conversation
      const conversationResult = await dbConnection.query(`
        INSERT INTO conversations (id, agent_id, user_id, organization_id, status, context, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *
      `, [
        'test-conversation-id',
        agentId,
        userId,
        orgId,
        'active',
        JSON.stringify({ industry: 'retail', purpose: 'customer_service' })
      ]);

      const conversation = conversationResult.rows[0];
      expect(conversation.status).toBe('active');

      // Add messages to conversation
      const messages = [
        { role: 'user', content: 'Hello, I need help with my order' },
        { role: 'assistant', content: 'I\'d be happy to help you with your order. Can you provide your order number?' },
        { role: 'user', content: 'My order number is #12345' }
      ];

      for (const [index, message] of messages.entries()) {
        await dbConnection.query(`
          INSERT INTO conversation_messages (id, conversation_id, role, content, token_count, created_at)
          VALUES ($1, $2, $3, $4, $5, NOW())
        `, [
          `message-${index}`,
          conversation.id,
          message.role,
          message.content,
          message.content.length // Simple token count for test
        ]);
      }

      // Verify conversation with messages
      const fullConversation = await dbConnection.query(`
        SELECT c.*, 
               array_agg(cm.content ORDER BY cm.created_at) as messages,
               array_agg(cm.role ORDER BY cm.created_at) as roles
        FROM conversations c
        LEFT JOIN conversation_messages cm ON c.id = cm.conversation_id
        WHERE c.id = $1
        GROUP BY c.id
      `, [conversation.id]);

      expect(fullConversation.rows).toHaveLength(1);
      expect(fullConversation.rows[0].messages).toHaveLength(3);
      expect(fullConversation.rows[0].roles).toEqual(['user', 'assistant', 'user']);

      // Update conversation status
      await dbConnection.query(`
        UPDATE conversations 
        SET status = $1, updated_at = NOW()
        WHERE id = $2
      `, ['completed', conversation.id]);

      const updatedConversation = await dbConnection.query(
        'SELECT status FROM conversations WHERE id = $1',
        [conversation.id]
      );
      expect(updatedConversation.rows[0].status).toBe('completed');
    });
  });

  describe('Redis Caching Operations', () => {
    it('should cache and retrieve AI agent responses', async () => {
      const cacheKey = 'agent-response:test-agent-id:user-message';
      const responseData = {
        response: 'This is a cached response',
        timestamp: Date.now(),
        tokens: 150,
        model: 'gpt-4'
      };

      // Store in Redis
      await redisClient.setex(cacheKey, 3600, JSON.stringify(responseData));

      // Retrieve from Redis
      const cachedData = await redisClient.get(cacheKey);
      const parsedData = JSON.parse(cachedData);

      expect(parsedData.response).toBe(responseData.response);
      expect(parsedData.tokens).toBe(responseData.tokens);
      expect(parsedData.model).toBe(responseData.model);
    });

    it('should handle session management', async () => {
      const sessionId = 'session:test-user-id';
      const sessionData = {
        userId: 'test-user-id',
        organizationId: 'test-org-id',
        loginTime: Date.now(),
        lastActivity: Date.now(),
        isActive: true
      };

      // Store session
      await redisClient.setex(sessionId, 7200, JSON.stringify(sessionData));

      // Update last activity
      sessionData.lastActivity = Date.now();
      await redisClient.setex(sessionId, 7200, JSON.stringify(sessionData));

      // Retrieve and verify session
      const retrievedSession = await redisClient.get(sessionId);
      const parsedSession = JSON.parse(retrievedSession);

      expect(parsedSession.userId).toBe('test-user-id');
      expect(parsedSession.isActive).toBe(true);
      expect(parsedSession.lastActivity).toBeGreaterThan(parsedSession.loginTime);
    });

    it('should handle rate limiting', async () => {
      const rateLimitKey = 'rate-limit:test-user-id:api-endpoint';
      const limit = 10;
      const window = 60; // seconds

      // Simulate API calls
      for (let i = 0; i < limit; i++) {
        const current = await redisClient.incr(rateLimitKey);
        if (current === 1) {
          await redisClient.expire(rateLimitKey, window);
        }
        expect(current).toBeLessThanOrEqual(limit);
      }

      // Next call should exceed limit
      const nextCall = await redisClient.incr(rateLimitKey);
      expect(nextCall).toBe(limit + 1);

      // Verify TTL
      const ttl = await redisClient.ttl(rateLimitKey);
      expect(ttl).toBeGreaterThan(0);
      expect(ttl).toBeLessThanOrEqual(window);
    });
  });

  describe('Transaction Management', () => {
    it('should handle transactions with rollback', async () => {
      const orgId = 'test-org-id-transaction';
      
      await dbConnection.query('BEGIN');

      try {
        // Create organization
        await dbConnection.query(`
          INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
          VALUES ($1, $2, $3, $4, NOW(), NOW())
        `, [orgId, 'Test Org', 'test.com', 'enterprise']);

        // Create user
        await dbConnection.query(`
          INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        `, ['user-transaction', 'test@example.com', 'hashed-password', orgId, 'admin', true]);

        // Simulate error
        throw new Error('Intentional error for rollback test');

      } catch (error) {
        await dbConnection.query('ROLLBACK');
      }

      // Verify rollback - no data should be inserted
      const orgCount = await dbConnection.query(
        'SELECT COUNT(*) FROM organizations WHERE id = $1',
        [orgId]
      );
      expect(parseInt(orgCount.rows[0].count)).toBe(0);

      const userCount = await dbConnection.query(
        'SELECT COUNT(*) FROM users WHERE email = $1',
        ['test@example.com']
      );
      expect(parseInt(userCount.rows[0].count)).toBe(0);
    });

    it('should handle nested transactions with savepoints', async () => {
      await dbConnection.query('BEGIN');

      // Create organization
      await dbConnection.query(`
        INSERT INTO organizations (id, name, domain, plan, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
      `, ['test-org-id-savepoint', 'Test Org', 'test.com', 'enterprise']);

      // Create savepoint
      await dbConnection.query('SAVEPOINT user_creation');

      try {
        // Attempt to create user with invalid data
        await dbConnection.query(`
          INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        `, ['user-savepoint', 'invalid-email', 'hashed-password', 'test-org-id-savepoint', 'admin', true]);

        // If we get here, rollback to savepoint
        await dbConnection.query('ROLLBACK TO SAVEPOINT user_creation');

      } catch (error) {
        // Rollback to savepoint on error
        await dbConnection.query('ROLLBACK TO SAVEPOINT user_creation');
      }

      // Create valid user after rollback
      await dbConnection.query(`
        INSERT INTO users (id, email, password_hash, organization_id, role, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `, ['user-savepoint-valid', 'valid@example.com', 'hashed-password', 'test-org-id-savepoint', 'admin', true]);

      await dbConnection.query('COMMIT');

      // Verify results
      const orgCount = await dbConnection.query(
        'SELECT COUNT(*) FROM organizations WHERE id = $1',
        ['test-org-id-savepoint']
      );
      expect(parseInt(orgCount.rows[0].count)).toBe(1);

      const validUserCount = await dbConnection.query(
        'SELECT COUNT(*) FROM users WHERE email = $1',
        ['valid@example.com']
      );
      expect(parseInt(validUserCount.rows[0].count)).toBe(1);

      const invalidUserCount = await dbConnection.query(
        'SELECT COUNT(*) FROM users WHERE email = $1',
        ['invalid-email']
      );
      expect(parseInt(invalidUserCount.rows[0].count)).toBe(0);
    });
  });
});
