import { 
  BaseService, 
  ServiceFactory, 
  ServiceResponse,
  ValidationError,
  NotFoundError,
  PermissionError 
} from '../../backend/services/base-service';

// Mock the database connection
jest.mock('../../backend/db/connection', () => ({
  db: {
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([])
        })
      })
    }),
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([])
      })
    }),
    update: jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined)
      })
    }),
    delete: jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue(undefined)
    })
  }
}));

// Mock audit logging
jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn()
}));

describe('Service Layer', () => {
  const mockContext = {
    userId: 'test-user-id',
    organizationId: 'test-org-id',
    role: 'user',
    ipAddress: '127.0.0.1',
    userAgent: 'test-agent'
  };

  // Test service implementation
  class TestService extends BaseService {
    async create(data: any): Promise<ServiceResponse> {
      const missing = this.validateRequired(data, ['name', 'email']);
      if (missing.length > 0) {
        throw new ValidationError(`Missing required fields: ${missing.join(', ')}`);
      }

      return this.handleServiceOperation(
        async () => ({ id: 'test-id', ...data }),
        'create',
        'test',
        'test-id'
      );
    }

    async findById(id: string): Promise<ServiceResponse> {
      if (!id) {
        throw new ValidationError('ID is required');
      }

      return this.handleServiceOperation(
        async () => ({ id, name: 'Test Item' }),
        'findById',
        'test',
        id
      );
    }

    async update(id: string, data: any): Promise<ServiceResponse> {
      if (!id) {
        throw new ValidationError('ID is required');
      }

      return this.handleServiceOperation(
        async () => ({ id, ...data }),
        'update',
        'test',
        id
      );
    }

    async delete(id: string): Promise<ServiceResponse> {
      if (!id) {
        throw new ValidationError('ID is required');
      }

      return this.handleServiceOperation(
        async () => ({ deleted: true, id }),
        'delete',
        'test',
        id
      );
    }

    async list(options: { pagination?: any; filters?: any }): Promise<ServiceResponse<any[]>> {
      return this.handleServiceOperation(
        async () => [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
        'list',
        'test'
      );
    }
  }

  let service: TestService;

  beforeEach(() => {
    service = new TestService(mockContext);
    jest.clearAllMocks();
  });

  describe('BaseService', () => {
    describe('CRUD Operations', () => {
      it('should create an item successfully', async () => {
        const data = { name: 'Test', email: 'test@example.com' };
        const result = await service.create(data);

        expect(result.success).toBe(true);
        expect(result.data).toEqual({ id: 'test-id', ...data });
      });

      it('should find item by ID successfully', async () => {
        const result = await service.findById('test-id');

        expect(result.success).toBe(true);
        expect(result.data).toEqual({ id: 'test-id', name: 'Test Item' });
      });

      it('should update item successfully', async () => {
        const data = { name: 'Updated Test' };
        const result = await service.update('test-id', data);

        expect(result.success).toBe(true);
        expect(result.data).toEqual({ id: 'test-id', ...data });
      });

      it('should delete item successfully', async () => {
        const result = await service.delete('test-id');

        expect(result.success).toBe(true);
        expect(result.data).toEqual({ deleted: true, id: 'test-id' });
      });

      it('should list items successfully', async () => {
        const result = await service.list({});

        expect(result.success).toBe(true);
        expect(result.data).toHaveLength(2);
      });
    });

    describe('Validation', () => {
      it('should throw ValidationError for missing required fields', async () => {
        const data = { name: 'Test' }; // missing email

        await expect(service.create(data)).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError for missing ID', async () => {
        await expect(service.findById('')).rejects.toThrow(ValidationError);
        await expect(service.update('', {})).rejects.toThrow(ValidationError);
        await expect(service.delete('')).rejects.toThrow(ValidationError);
      });
    });

    describe('Error Handling', () => {
      it('should handle service operation errors', async () => {
        class FailingService extends BaseService {
          async create(data: any): Promise<ServiceResponse> {
            return this.handleServiceOperation(
              async () => {
                throw new Error('Service error');
              },
              'create',
              'test'
            );
          }

      // Implement required abstract methods
      async findById(id: string): Promise<ServiceResponse> {
        return this.handleServiceOperation(async () => ({}), 'findById', 'test', id);
      }
      async update(id: string, data: any): Promise<ServiceResponse> {
        return this.handleServiceOperation(async () => ({}), 'update', 'test', id);
      }
      async delete(id: string): Promise<ServiceResponse> {
        return this.handleServiceOperation(async () => ({}), 'delete', 'test', id);
      }
      async list(options: any): Promise<ServiceResponse<any[]>> {
        return this.handleServiceOperation(async () => [], 'list', 'test');
      }
        }

        const failingService = new FailingService(mockContext);
        const result = await failingService.create({});

        expect(result.success).toBe(false);
        expect(result.error).toBe('Service error');
      });
    });

    describe('Utility Methods', () => {
      it('should build pagination query correctly', () => {
        const pagination = service.buildPaginationQuery({
          page: 2,
          limit: 10
        });

        expect(pagination.page).toBe(2);
        expect(pagination.limit).toBe(10);
        expect(pagination.offset).toBe(10);
      });

      it('should validate required fields correctly', () => {
        const data = { name: 'Test', email: 'test@example.com' };
        const missing = service.validateRequired(data, ['name', 'email']);

        expect(missing).toHaveLength(0);
      });

      it('should identify missing required fields', () => {
        const data = { name: 'Test' };
        const missing = service.validateRequired(data, ['name', 'email']);

        expect(missing).toEqual(['email']);
      });

      it('should check permissions', () => {
        const hasPermission = service.hasPermission('test:read');
        expect(typeof hasPermission).toBe('boolean');
      });
    });
  });

  describe('ServiceFactory', () => {
    it('should register and create services', () => {
      ServiceFactory.register('TestService', TestService);
      
      const createdService = ServiceFactory.create('TestService', mockContext);
      
      expect(createdService).toBeInstanceOf(TestService);
      expect(createdService).toBeInstanceOf(BaseService);
    });

    it('should throw error for unregistered service', () => {
      expect(() => {
        ServiceFactory.create('NonExistentService', mockContext);
      }).toThrow('Service \'NonExistentService\' not found');
    });

    it('should list registered services', () => {
      ServiceFactory.register('AnotherService', TestService);
      
      const services = ServiceFactory.list();
      
      expect(services).toContain('TestService');
      expect(services).toContain('AnotherService');
    });
  });

  describe('Error Classes', () => {
    it('should create ValidationError with correct properties', () => {
      const error = new ValidationError('Test validation error', 'email');
      
      expect(error.message).toBe('Test validation error');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.field).toBe('email');
    });

    it('should create NotFoundError with correct properties', () => {
      const error = new NotFoundError('User', '123');
      
      expect(error.message).toBe('User with id 123 not found');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should create PermissionError with correct properties', () => {
      const error = new PermissionError('delete', 'user');
      
      expect(error.message).toBe('Insufficient permissions to delete user');
      expect(error.code).toBe('PERMISSION_DENIED');
      expect(error.statusCode).toBe(403);
    });
  });

  describe('Context Handling', () => {
    it('should use context in operations', () => {
      expect(service.context.userId).toBe(mockContext.userId);
      expect(service.context.organizationId).toBe(mockContext.organizationId);
      expect(service.context.role).toBe(mockContext.role);
    });

    it('should handle context with minimal required fields', () => {
      const minimalContext = {
        userId: 'user',
        organizationId: 'org',
        role: 'admin'
      };
      
      const minimalService = new TestService(minimalContext);
      expect(minimalService.context).toEqual(minimalContext);
    });
  });
});
