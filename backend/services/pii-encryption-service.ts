import { db } from '../db/connection';
import { users, organizations, payments } from '../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import {
  encryptUserPII,
  decryptUserPII,
  encryptPaymentData,
  decryptPaymentData,
  encryptField,
  decryptField,
  getFieldEncryptionKey
} from '../lib/encryption';
import { logAudit } from '../lib/audit';

/**
 * Service for handling encrypted PII data with automatic encryption/decryption
 */

// User PII encryption/decryption
export async function createUserWithEncryptedPII(userData: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: any;
  taxId?: string;
  emergencyContact?: any;
  organizationId?: string;
  role?: string;
}) {
  const piiData = {
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    taxId: userData.taxId,
    emergencyContact: userData.emergencyContact,
  };

  const encryptedPII = encryptUserPII(piiData);

  const [user] = await db.insert(users).values({
    email: userData.email,
    passwordHash: userData.passwordHash,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber, // Keep for backward compatibility
    phoneNumberEncrypted: encryptedPII.phoneNumber,
    address: userData.address, // Keep for backward compatibility
    addressEncrypted: encryptedPII.address,
    taxId: userData.taxId, // Keep for backward compatibility
    taxIdEncrypted: encryptedPII.taxId,
    emergencyContactEncrypted: encryptedPII.emergencyContact,
    organizationId: userData.organizationId,
    role: userData.role || 'user',
  }).returning();

  logAudit({
    userId: user.id,
    organizationId: userData.organizationId,
    action: 'USER_CREATED',
    resource: 'user',
    resourceId: user.id,
    metadata: { piiEncrypted: true },
    status: 'success',
    severity: 'info',
  });

  return user;
}

export async function getUserWithDecryptedPII(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  
  if (!user) {
    return null;
  }

  const encryptedData = {
    phoneNumber: user.phoneNumberEncrypted,
    address: user.addressEncrypted,
    taxId: user.taxIdEncrypted,
    emergencyContact: user.emergencyContactEncrypted,
  };

  const decryptedPII = decryptUserPII(encryptedData);

  return {
    ...user,
    decryptedPII,
  };
}

export async function updateUserPII(userId: string, piiData: {
  phoneNumber?: string;
  address?: any;
  taxId?: string;
  emergencyContact?: any;
}) {
  const encryptedPII = encryptUserPII(piiData);

  const updates: any = {};
  
  if (piiData.phoneNumber !== undefined) {
    updates.phoneNumber = piiData.phoneNumber;
    updates.phoneNumberEncrypted = encryptedPII.phoneNumber;
  }
  
  if (piiData.address !== undefined) {
    updates.address = piiData.address;
    updates.addressEncrypted = encryptedPII.address;
  }
  
  if (piiData.taxId !== undefined) {
    updates.taxId = piiData.taxId;
    updates.taxIdEncrypted = encryptedPII.taxId;
  }
  
  if (piiData.emergencyContact !== undefined) {
    updates.emergencyContactEncrypted = encryptedPII.emergencyContact;
  }

  const [user] = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, userId))
    .returning();

  logAudit({
    userId,
    organizationId: user.organizationId,
    action: 'USER_PII_UPDATED',
    resource: 'user',
    resourceId: userId,
    metadata: { fieldsUpdated: Object.keys(piiData) },
    status: 'success',
    severity: 'info',
  });

  return user;
}

// Organization PII encryption/decryption
export async function createOrganizationWithEncryptedPII(orgData: {
  name: string;
  slug: string;
  ownerId: string;
  billingEmail: string;
  taxId?: string;
  address?: any;
  plan?: string;
}) {
  const piiData = {
    billingEmail: orgData.billingEmail,
    taxId: orgData.taxId,
    address: orgData.address,
  };

  const encryptionKey = getFieldEncryptionKey();

  const encryptedData = {
    billingEmailEncrypted: encryptField(orgData.billingEmail, encryptionKey),
    taxIdEncrypted: orgData.taxId ? encryptField(orgData.taxId, encryptionKey) : undefined,
    addressEncrypted: orgData.address ? encryptField(JSON.stringify(orgData.address), encryptionKey) : undefined,
  };

  const [organization] = await db.insert(organizations).values({
    name: orgData.name,
    slug: orgData.slug,
    ownerId: orgData.ownerId,
    billingEmail: orgData.billingEmail, // Keep for backward compatibility
    billingEmailEncrypted: encryptedData.billingEmailEncrypted,
    taxId: orgData.taxId, // Keep for backward compatibility
    taxIdEncrypted: encryptedData.taxIdEncrypted,
    address: orgData.address, // Keep for backward compatibility
    addressEncrypted: encryptedData.addressEncrypted,
    plan: orgData.plan || 'free',
  }).returning();

  logAudit({
    userId: orgData.ownerId,
    organizationId: organization.id,
    action: 'ORGANIZATION_CREATED',
    resource: 'organization',
    resourceId: organization.id,
    metadata: { piiEncrypted: true },
    status: 'success',
    severity: 'info',
  });

  return organization;
}

export async function getOrganizationWithDecryptedPII(organizationId: string) {
  const [organization] = await db.select().from(organizations).where(eq(organizations.id, organizationId)).limit(1);
  
  if (!organization) {
    return null;
  }

  const encryptionKey = getFieldEncryptionKey();

  const decryptedData: any = {};

  if (organization.billingEmailEncrypted) {
    decryptedData.billingEmail = decryptField(organization.billingEmailEncrypted, encryptionKey);
  }

  if (organization.taxIdEncrypted) {
    decryptedData.taxId = decryptField(organization.taxIdEncrypted, encryptionKey);
  }

  if (organization.addressEncrypted) {
    decryptedData.address = JSON.parse(decryptField(organization.addressEncrypted, encryptionKey));
  }

  return {
    ...organization,
    decryptedPII: decryptedData,
  };
}

// Payment data encryption/decryption
export async function createPaymentWithEncryptedData(paymentData: {
  organizationId: string;
  invoiceId?: string;
  amount: string;
  currency?: string;
  method: string;
  transactionId?: string;
  paymentMethodDetails?: {
    cardNumber?: string;
    bankAccount?: string;
    routingNumber?: string;
  };
  gatewayResponse?: any;
}) {
  const encryptedPaymentData = encryptPaymentData({
    cardNumber: paymentData.paymentMethodDetails?.cardNumber,
    bankAccount: paymentData.paymentMethodDetails?.bankAccount,
    routingNumber: paymentData.paymentMethodDetails?.routingNumber,
  });

  const encryptionKey = getFieldEncryptionKey();

  const encryptedGatewayResponse = paymentData.gatewayResponse 
    ? encryptField(JSON.stringify(paymentData.gatewayResponse), encryptionKey)
    : undefined;

  const [payment] = await db.insert(payments).values({
    organizationId: paymentData.organizationId,
    invoiceId: paymentData.invoiceId,
    amount: paymentData.amount,
    currency: paymentData.currency || 'USD',
    method: paymentData.method,
    transactionId: paymentData.transactionId,
    paymentMethodDetailsEncrypted: encryptedPaymentData,
    gatewayResponse: paymentData.gatewayResponse, // Keep for backward compatibility
    gatewayResponseEncrypted: encryptedGatewayResponse,
  }).returning();

  logAudit({
    organizationId: paymentData.organizationId,
    action: 'PAYMENT_CREATED',
    resource: 'payment',
    resourceId: payment.id,
    metadata: { paymentMethod: paymentData.method, dataEncrypted: true },
    status: 'success',
    severity: 'info',
  });

  return payment;
}

export async function getPaymentWithDecryptedData(paymentId: string) {
  const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
  
  if (!payment) {
    return null;
  }

  const decryptedData: any = {};

  if (payment.paymentMethodDetailsEncrypted) {
    decryptedData.paymentMethodDetails = decryptPaymentData(payment.paymentMethodDetailsEncrypted);
  }

  if (payment.gatewayResponseEncrypted) {
    const encryptionKey = getFieldEncryptionKey();
    decryptedData.gatewayResponse = JSON.parse(decryptField(payment.gatewayResponseEncrypted, encryptionKey));
  }

  return {
    ...payment,
    decryptedData,
  };
}
