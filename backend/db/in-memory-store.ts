import { User, Session, Organization, AuditLog, DataBackup, Consent, EncryptedData } from './schema';

class InMemoryDatabase {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private organizations: Map<string, Organization> = new Map();
  private auditLogs: AuditLog[] = [];
  private backups: Map<string, DataBackup> = new Map();
  private consents: Map<string, Consent> = new Map();
  private encryptedData: Map<string, EncryptedData> = new Map();
  private emailIndex: Map<string, string> = new Map();
  private sessionTokenIndex: Map<string, string> = new Map();

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    const userId = this.emailIndex.get(email.toLowerCase());
    return userId ? this.users.get(userId) : undefined;
  }

  createUser(user: User): void {
    this.users.set(user.id, user);
    this.emailIndex.set(user.email.toLowerCase(), user.id);
  }

  updateUser(id: string, updates: Partial<User>): void {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates, updatedAt: Date.now() };
      this.users.set(id, updatedUser);
      if (updates.email) {
        this.emailIndex.delete(user.email.toLowerCase());
        this.emailIndex.set(updates.email.toLowerCase(), id);
      }
    }
  }

  deleteUser(id: string): void {
    const user = this.users.get(id);
    if (user) {
      this.emailIndex.delete(user.email.toLowerCase());
      this.users.delete(id);
    }
  }

  createSession(session: Session): void {
    this.sessions.set(session.id, session);
    this.sessionTokenIndex.set(session.token, session.id);
  }

  getSessionByToken(token: string): Session | undefined {
    const sessionId = this.sessionTokenIndex.get(token);
    return sessionId ? this.sessions.get(sessionId) : undefined;
  }

  updateSession(id: string, updates: Partial<Session>): void {
    const session = this.sessions.get(id);
    if (session) {
      this.sessions.set(id, { ...session, ...updates });
    }
  }

  deleteSession(id: string): void {
    const session = this.sessions.get(id);
    if (session) {
      this.sessionTokenIndex.delete(session.token);
      this.sessions.delete(id);
    }
  }

  getUserSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(s => s.userId === userId);
  }

  createOrganization(org: Organization): void {
    this.organizations.set(org.id, org);
  }

  getOrganization(id: string): Organization | undefined {
    return this.organizations.get(id);
  }

  updateOrganization(id: string, updates: Partial<Organization>): void {
    const org = this.organizations.get(id);
    if (org) {
      this.organizations.set(id, { ...org, ...updates, updatedAt: Date.now() });
    }
  }

  addAuditLog(log: AuditLog): void {
    this.auditLogs.push(log);
    if (this.auditLogs.length > 100000) {
      this.auditLogs = this.auditLogs.slice(-50000);
    }
  }

  getAuditLogs(filters: {
    userId?: string;
    organizationId?: string;
    action?: string;
    startDate?: number;
    endDate?: number;
    limit?: number;
  }): AuditLog[] {
    let logs = this.auditLogs;

    if (filters.userId) {
      logs = logs.filter(l => l.userId === filters.userId);
    }
    if (filters.organizationId) {
      logs = logs.filter(l => l.organizationId === filters.organizationId);
    }
    if (filters.action) {
      logs = logs.filter(l => l.action === filters.action);
    }
    if (filters.startDate) {
      logs = logs.filter(l => l.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      logs = logs.filter(l => l.timestamp <= filters.endDate!);
    }

    logs = logs.sort((a, b) => b.timestamp - a.timestamp);

    if (filters.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return logs;
  }

  createBackup(backup: DataBackup): void {
    this.backups.set(backup.id, backup);
  }

  getBackup(id: string): DataBackup | undefined {
    return this.backups.get(id);
  }

  getOrganizationBackups(organizationId: string): DataBackup[] {
    return Array.from(this.backups.values())
      .filter(b => b.organizationId === organizationId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  updateBackup(id: string, updates: Partial<DataBackup>): void {
    const backup = this.backups.get(id);
    if (backup) {
      this.backups.set(id, { ...backup, ...updates });
    }
  }

  createConsent(consent: Consent): void {
    this.consents.set(consent.id, consent);
  }

  getUserConsents(userId: string): Consent[] {
    return Array.from(this.consents.values())
      .filter(c => c.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  storeEncryptedData(data: EncryptedData): void {
    this.encryptedData.set(data.id, data);
  }

  getEncryptedData(id: string): EncryptedData | undefined {
    return this.encryptedData.get(id);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getAllOrganizations(): Organization[] {
    return Array.from(this.organizations.values());
  }
}

export const db = new InMemoryDatabase();
