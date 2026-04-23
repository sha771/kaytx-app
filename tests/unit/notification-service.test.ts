import { NotificationService } from '../../backend/services/notification-service';
import { db as pgDb } from '../../backend/db/connection';
import { logAudit } from '../../backend/lib/audit';

// Mock dependencies
jest.mock('../../backend/db/connection');
jest.mock('../../backend/lib/audit');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('NotificationService', () => {
  let service: NotificationService;
  const mockUserId = 'user-123';
  const mockOrgId = 'org-123';

  beforeEach(() => {
    service = new NotificationService();
    jest.clearAllMocks();
    
    // Mock database responses
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue([{
              id: 'notif-123',
              userId: mockUserId,
              organizationId: mockOrgId,
              type: 'info',
              title: 'Test Notification',
              message: 'This is a test notification',
              data: {},
              isRead: false,
              priority: 'medium',
              channels: ['in_app'],
              createdAt: new Date(),
              updatedAt: new Date()
            }])
          })
        })
      })
    } as any);

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{
          id: 'notif-123',
          userId: mockUserId,
          organizationId: mockOrgId,
          type: 'info',
          title: 'Test Notification',
          message: 'This is a test notification',
          data: {},
          isRead: false,
          priority: 'medium',
          channels: ['in_app'],
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      })
    } as any);

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([{ id: 'notif-123' }])
      })
    } as any);

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([])
    } as any);

    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('createNotification', () => {
    it('should create notification successfully', async () => {
      const result = await service.createNotification({
        userId: mockUserId,
        organizationId: mockOrgId,
        type: 'info',
        title: 'Test Notification',
        message: 'This is a test notification',
        priority: 'medium',
        channels: ['in_app']
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('userId', mockUserId);
      expect(result).toHaveProperty('type', 'info');
      expect(result).toHaveProperty('title', 'Test Notification');
      expect(result).toHaveProperty('message', 'This is a test notification');
      expect(result).toHaveProperty('isRead', false);
      expect(result).toHaveProperty('priority', 'medium');
      expect(mockLogAudit).toHaveBeenCalledWith({
        userId: mockUserId,
        organizationId: mockOrgId,
        action: 'notification_created',
        resource: 'notification',
        resourceId: result.id,
        details: expect.objectContaining({
          type: 'info',
          priority: 'medium'
        })
      });
    });

    it('should validate required fields', async () => {
      await expect(service.createNotification({
        userId: mockUserId,
        organizationId: mockOrgId,
        type: 'info',
        title: '',
        message: 'Test message'
      })).rejects.toThrow('Title is required');

      await expect(service.createNotification({
        userId: mockUserId,
        organizationId: mockOrgId,
        type: 'info',
        title: 'Test',
        message: ''
      })).rejects.toThrow('Message is required');
    });

    it('should set default values', async () => {
      const result = await service.createNotification({
        userId: mockUserId,
        organizationId: mockOrgId,
        type: 'info',
        title: 'Test',
        message: 'Test message'
      });

      expect(result.priority).toBe('medium');
      expect(result.channels).toEqual(['in_app']);
      expect(result.isRead).toBe(false);
    });
  });

  describe('getUserNotifications', () => {
    it('should get user notifications', async () => {
      const result = await service.getUserNotifications(mockUserId, mockOrgId, {
        limit: 10,
        offset: 0
      });

      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe(mockUserId);
      expect(result[0].organizationId).toBe(mockOrgId);
    });

    it('should filter by read status', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([{
                id: 'notif-123',
                isRead: true
              }])
            })
          })
        })
      } as any);

      const result = await service.getUserNotifications(mockUserId, mockOrgId, {
        isRead: true
      });

      expect(result).toHaveLength(1);
      expect(result[0].isRead).toBe(true);
    });

    it('should filter by type', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([{
                id: 'notif-123',
                type: 'alert'
              }])
            })
          })
        })
      } as any);

      const result = await service.getUserNotifications(mockUserId, mockOrgId, {
        type: 'alert'
      });

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('alert');
    });

    it('should filter by priority', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              offset: jest.fn().mockResolvedValue([{
                id: 'notif-123',
                priority: 'high'
              }])
            })
          })
        })
      } as any);

      const result = await service.getUserNotifications(mockUserId, mockOrgId, {
        priority: 'high'
      });

      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe('high');
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      const result = await service.markAsRead('notif-123', mockUserId, mockOrgId);

      expect(result).toBeTruthy();
      expect(result?.isRead).toBe(true);
      expect(mockLogAudit).toHaveBeenCalledWith({
        userId: mockUserId,
        organizationId: mockOrgId,
        action: 'notification_read',
        resource: 'notification',
        resourceId: 'notif-123'
      });
    });

    it('should return false for non-existent notification', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      const result = await service.markAsRead('non-existent', mockUserId, mockOrgId);

      expect(result).toBe(false);
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue({ rowCount: 5 })
        })
      } as any);

      const result = await service.markAllAsRead(mockUserId, mockOrgId);

      expect(result).toBe(5);
      expect(mockLogAudit).toHaveBeenCalledWith({
        userId: mockUserId,
        organizationId: mockOrgId,
        action: 'notifications_marked_all_read',
        resource: 'notification',
        details: expect.objectContaining({
          count: 5
        })
      });
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', async () => {
      const result = await service.deleteNotification('notif-123', mockUserId, mockOrgId);

      expect(result).toBe(true);
      expect(mockLogAudit).toHaveBeenCalledWith({
        userId: mockUserId,
        organizationId: mockOrgId,
        action: 'notification_deleted',
        resource: 'notification',
        resourceId: 'notif-123'
      });
    });

    it('should return false for non-existent notification', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      } as any);

      const result = await service.deleteNotification('non-existent', mockUserId, mockOrgId);

      expect(result).toBe(false);
    });
  });

  describe('sendEmailNotification', () => {
    it('should send email notification', async () => {
      // Mock email service
      const mockEmailService = {
        sendEmail: jest.fn().mockResolvedValue({ messageId: 'email-123' })
      };
      (service as any).emailService = mockEmailService;

      const result = await service.sendEmailNotification({
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        userId: mockUserId,
        organizationId: mockOrgId
      });

      expect(result).toHaveProperty('messageId', 'email-123');
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>'
      });
    });

    it('should handle email sending errors', async () => {
      const mockEmailService = {
        sendEmail: jest.fn().mockRejectedValue(new Error('Email failed'))
      };
      (service as any).emailService = mockEmailService;

      await expect(service.sendEmailNotification({
        to: 'test@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        userId: mockUserId,
        organizationId: mockOrgId
      })).rejects.toThrow('Email failed');
    });
  });

  describe('sendPushNotification', () => {
    it('should send push notification', async () => {
      // Mock push service
      const mockPushService = {
        sendPush: jest.fn().mockResolvedValue({ success: true, messageId: 'push-123' })
      };
      (service as any).pushService = mockPushService;

      const result = await service.sendPushNotification({
        userId: mockUserId,
        organizationId: mockOrgId,
        title: 'Test Push',
        body: 'Test push notification',
        data: { type: 'test' }
      });

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('messageId', 'push-123');
      expect(mockPushService.sendPush).toHaveBeenCalledWith({
        userId: mockUserId,
        title: 'Test Push',
        body: 'Test push notification',
        data: { type: 'test' }
      });
    });
  });

  describe('sendSMSNotification', () => {
    it('should send SMS notification', async () => {
      // Mock SMS service
      const mockSMSService = {
        sendSMS: jest.fn().mockResolvedValue({ sid: 'sms-123', status: 'sent' })
      };
      (service as any).smsService = mockSMSService;

      const result = await service.sendSMSNotification({
        to: '+1234567890',
        message: 'Test SMS message',
        userId: mockUserId,
        organizationId: mockOrgId
      });

      expect(result).toHaveProperty('sid', 'sms-123');
      expect(result).toHaveProperty('status', 'sent');
      expect(mockSMSService.sendSMS).toHaveBeenCalledWith({
        to: '+1234567890',
        message: 'Test SMS message'
      });
    });
  });

  describe('getNotificationStats', () => {
    it('should get notification statistics', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([
              { type: 'info', isRead: true },
              { type: 'info', isRead: false },
              { type: 'alert', isRead: false },
              { type: 'alert', isRead: false }
            ])
          })
        })
      } as any);

      const result = await service.getNotificationStats(mockUserId, mockOrgId);

      expect(result).toHaveProperty('total', 4);
      expect(result).toHaveProperty('unread', 3);
      expect(result).toHaveProperty('read', 1);
      expect(result).toHaveProperty('byType');
      expect(result.byType.info).toBe(2);
      expect(result.byType.alert).toBe(2);
      expect(result).toHaveProperty('readRate', 0.25);
    });
  });

  describe('cleanupOldNotifications', () => {
    it('should cleanup old notifications', async () => {
      mockDb.delete.mockReturnValue({
        where: jest.fn().mockResolvedValue({ rowCount: 100 })
      } as any);

      const result = await service.cleanupOldNotifications(30); // 30 days

      expect(result).toBe(100);
      expect(mockDb.delete).toHaveBeenCalled();
    });
  });

  describe('batchCreateNotifications', () => {
    it('should create multiple notifications in batch', async () => {
      const notifications = [
        {
          userId: mockUserId,
          organizationId: mockOrgId,
          type: 'info' as const,
          title: 'Notification 1',
          message: 'Message 1'
        },
        {
          userId: mockUserId,
          organizationId: mockOrgId,
          type: 'alert' as const,
          title: 'Notification 2',
          message: 'Message 2'
        }
      ];

      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([
            { id: 'notif-1', title: 'Notification 1' },
            { id: 'notif-2', title: 'Notification 2' }
          ])
        })
      } as any);

      const result = await service.batchCreateNotifications(notifications);

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Notification 1');
      expect(result[1].title).toBe('Notification 2');
    });

    it('should handle batch size limits', async () => {
      const notifications = Array(200).fill({
        userId: mockUserId,
        organizationId: mockOrgId,
        type: 'info' as const,
        title: 'Test',
        message: 'Test'
      });

      await expect(service.batchCreateNotifications(notifications))
        .rejects.toThrow('Batch size exceeds maximum of 100');
    });
  });
});
