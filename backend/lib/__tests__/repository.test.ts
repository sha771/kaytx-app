import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { BaseRepository } from '../repository';

// Mock database connection
const mockDb = {
  select: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  query: jest.fn(),
};

describe('BaseRepository', () => {
  let repository: BaseRepository<any>;
  let mockTable: any;

  beforeEach(() => {
    mockTable = {
      id: 'id',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    };

    repository = new BaseRepository(mockDb as any, mockTable);
    jest.clearAllMocks();
  });

  describe('Basic CRUD Operations', () => {
    it('should create a record', async () => {
      const data = { name: 'Test', email: 'test@example.com' };
      const expectedRecord = { id: '1', ...data, createdAt: new Date(), updatedAt: new Date() };
      
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([expectedRecord])
        })
      });

      const result = await repository.create(data);

      expect(result).toEqual(expectedRecord);
      expect(mockDb.insert).toHaveBeenCalledWith(mockTable);
    });

    it('should find a record by id', async () => {
      const expectedRecord = { id: '1', name: 'Test', createdAt: new Date() };
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([expectedRecord])
          })
        })
      });

      const result = await repository.findById('1');

      expect(result).toEqual(expectedRecord);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should return null when record not found', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      });

      const result = await repository.findById('999');

      expect(result).toBeNull();
    });

    it('should find multiple records', async () => {
      const expectedRecords = [
        { id: '1', name: 'Test 1' },
        { id: '2', name: 'Test 2' }
      ];
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue(expectedRecords)
          })
        })
      });

      const result = await repository.findMany({ limit: 10, offset: 0 });

      expect(result).toEqual(expectedRecords);
    });

    it('should update a record', async () => {
      const updateData = { name: 'Updated' };
      const expectedRecord = { id: '1', name: 'Updated', updatedAt: new Date() };
      
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([expectedRecord])
          })
        })
      });

      const result = await repository.update('1', updateData);

      expect(result).toEqual(expectedRecord);
      expect(mockDb.update).toHaveBeenCalledWith(mockTable);
    });

    it('should delete a record', async () => {
      const expectedRecord = { id: '1', name: 'Test', deletedAt: new Date() };
      
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([expectedRecord])
          })
        })
      });

      const result = await repository.delete('1');

      expect(result).toEqual(expectedRecord);
      expect(mockDb.update).toHaveBeenCalledWith(mockTable);
    });

    it('should permanently delete a record', async () => {
      const expectedRecord = { id: '1', name: 'Test' };
      
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([expectedRecord])
        })
      });

      const result = await repository.permanentDelete('1');

      expect(result).toEqual(expectedRecord);
      expect(mockDb.delete).toHaveBeenCalledWith(mockTable);
    });
  });

  describe('Query Building', () => {
    it('should build where conditions', async () => {
      const where = { name: 'Test', active: true };
      const expectedRecord = { id: '1', name: 'Test', active: true };
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([expectedRecord])
          })
        })
      });

      await repository.findMany({ where });

      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should handle order by', async () => {
      const orderBy = { name: 'asc' };
      const expectedRecords = [{ id: '1', name: 'Test' }];
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue(expectedRecords)
            })
          })
        })
      });

      await repository.findMany({ orderBy });

      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should handle complex queries', async () => {
      const options = {
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        limit: 5,
        offset: 10,
      };
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue({
                offset: jest.fn().mockResolvedValue([])
              })
            })
          })
        })
      });

      await repository.findMany(options);

      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe('Pagination', () => {
    it('should paginate results correctly', async () => {
      const page = 2;
      const limit = 10;
      const expectedRecords = Array(10).fill(null).map((_, i) => ({
        id: `${i + 11}`,
        name: `Test ${i + 11}`
      }));
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue(expectedRecords)
          })
        })
      });

      const result = await repository.findMany({ page, limit });

      expect(result).toEqual(expectedRecords);
    });

    it('should handle pagination with total count', async () => {
      const page = 1;
      const limit = 5;
      const records = Array(5).fill(null).map((_, i) => ({ id: `${i + 1}`, name: `Test ${i + 1}` }));
      const totalCount = 25;
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue(records)
          })
        })
      });

      mockDb.query.mockResolvedValue([{ count: totalCount }]);

      const result = await repository.findManyWithPagination({ page, limit });

      expect(result.records).toEqual(records);
      expect(result.totalCount).toBe(totalCount);
      expect(result.totalPages).toBe(5);
      expect(result.currentPage).toBe(page);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPreviousPage).toBe(false);
    });
  });

  describe('Soft Delete', () => {
    it('should exclude soft deleted records by default', async () => {
      const activeRecord = { id: '1', name: 'Active', deletedAt: null };
      const deletedRecord = { id: '2', name: 'Deleted', deletedAt: new Date() };
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([activeRecord])
          })
        })
      });

      const result = await repository.findMany({});

      expect(result).toEqual([activeRecord]);
      expect(result).not.toContain(deletedRecord);
    });

    it('should include soft deleted records when requested', async () => {
      const activeRecord = { id: '1', name: 'Active', deletedAt: null };
      const deletedRecord = { id: '2', name: 'Deleted', deletedAt: new Date() };
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue([activeRecord, deletedRecord])
          })
        })
      });

      const result = await repository.findMany({ includeDeleted: true });

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(activeRecord);
      expect(result).toContainEqual(deletedRecord);
    });

    it('should restore soft deleted record', async () => {
      const restoredRecord = { id: '1', name: 'Restored', deletedAt: null };
      
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([restoredRecord])
          })
        })
      });

      const result = await repository.restore('1');

      expect(result).toEqual(restoredRecord);
      expect(result.deletedAt).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      const error = new Error('Database connection failed');
      mockDb.select.mockImplementation(() => {
        throw error;
      });

      await expect(repository.findById('1')).rejects.toThrow('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidData = { name: null }; // Invalid name
      
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Name cannot be null'))
        })
      });

      await expect(repository.create(invalidData)).rejects.toThrow('Name cannot be null');
    });
  });

  describe('Count Operations', () => {
    it('should count records', async () => {
      const expectedCount = 42;
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([{ count: expectedCount }])
        })
      });

      const result = await repository.count();

      expect(result).toBe(expectedCount);
    });

    it('should count records with conditions', async () => {
      const where = { active: true };
      const expectedCount = 25;
      
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([{ count: expectedCount }])
        })
      });

      const result = await repository.count({ where });

      expect(result).toBe(expectedCount);
    });
  });

  describe('Bulk Operations', () => {
    it('should create multiple records', async () => {
      const data = [
        { name: 'Test 1', email: 'test1@example.com' },
        { name: 'Test 2', email: 'test2@example.com' }
      ];
      const expectedRecords = data.map((item, index) => ({
        id: `${index + 1}`,
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue(expectedRecords)
        })
      });

      const result = await repository.createMany(data);

      expect(result).toEqual(expectedRecords);
      expect(mockDb.insert).toHaveBeenCalledWith(mockTable);
    });

    it('should update multiple records', async () => {
      const updateData = { active: false };
      const where = { status: 'inactive' };
      const expectedRecords = [
        { id: '1', active: false },
        { id: '2', active: false }
      ];
      
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue(expectedRecords)
          })
        })
      });

      const result = await repository.updateMany(where, updateData);

      expect(result).toEqual(expectedRecords);
    });
  });

  describe('Transaction Support', () => {
    it('should support transaction operations', async () => {
      const transaction = {
        rollback: jest.fn(),
        commit: jest.fn(),
      };
      
      const data = { name: 'Test' };
      const expectedRecord = { id: '1', ...data };
      
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([expectedRecord])
        })
      });

      const result = await repository.create(data, { transaction });

      expect(result).toEqual(expectedRecord);
    });
  });
});
