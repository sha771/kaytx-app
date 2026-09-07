/**
 * Internationalization (i18n) Framework
 * Lightweight i18n for React Native + Web using Zustand for state management.
 * No external dependency required — uses Intl API for pluralization.
 */

import { createStore } from 'zustand';

// ============================================================================
// Types
// ============================================================================

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ar' | 'zh' | 'ja' | 'pt' | 'hi';

export type TranslationKey = string;

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Record<Locale, TranslationDictionary>;
}

// ============================================================================
// Default English Translations
// ============================================================================

const en: TranslationDictionary = {
  common: {
    appName: 'Kaytx',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    search: 'Search',
    noResults: 'No results found',
    required: 'Required',
    optional: 'Optional',
  },
  auth: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    createAccount: 'Create account',
    mfaPrompt: 'Enter your 6-digit code',
    welcome: 'Welcome back',
  },
  navigation: {
    home: 'Home',
    agents: 'AI Agents',
    assistant: 'Assistant',
    messages: 'Messages',
    settings: 'Settings',
    profile: 'Profile',
    analytics: 'Analytics',
    billing: 'Billing',
    team: 'Team',
  },
  agent: {
    title: 'AI Agent',
    departments: 'Departments',
    capabilities: 'Capabilities',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Draft',
    activate: 'Activate',
    deactivate: 'Deactivate',
    chat: 'Chat',
    configure: 'Configure',
  },
  errors: {
    networkError: 'Network error. Please check your connection.',
    unauthorized: 'You are not authorized to perform this action.',
    notFound: 'The requested resource was not found.',
    serverError: 'Server error. Please try again later.',
    rateLimited: 'Too many requests. Please slow down.',
  },
};

// ============================================================================
// Stub Translations for Other Locales
// (These fall back to English for missing keys)
// ============================================================================

const es: TranslationDictionary = {
  common: {
    loading: 'Cargando...',
    error: 'Algo salió mal',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    back: 'Atrás',
    search: 'Buscar',
    noResults: 'Sin resultados',
  },
  auth: {
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    signUp: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
  },
  navigation: {
    home: 'Inicio',
    agents: 'Agentes IA',
    settings: 'Configuración',
  },
};

const fr: TranslationDictionary = {
  common: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    close: 'Fermer',
  },
  auth: {
    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
    email: 'E-mail',
    password: 'Mot de passe',
  },
};

const ar: TranslationDictionary = {
  common: {
    loading: 'جارٍ التحميل...',
    error: 'حدث خطأ ما',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
  },
  auth: {
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
  },
};

const zh: TranslationDictionary = {
  common: {
    loading: '加载中...',
    error: '出错了',
    cancel: '取消',
    save: '保存',
    delete: '删除',
  },
  auth: {
    signIn: '登录',
    signOut: '退出',
    email: '邮箱',
    password: '密码',
  },
};

// ============================================================================
// Store
// ============================================================================

const translations: Record<Locale, TranslationDictionary> = { en, es, fr, ar, zh };

export const i18nStore = createStore<I18nState>((set) => ({
  locale: 'en',
  translations,
  setLocale: (locale) => set({ locale }),
}));

// ============================================================================
// Helper: Deep lookup
// ============================================================================

function lookup(dictionary: TranslationDictionary, key: TranslationKey): string | undefined {
  const parts = key.split('.');
  let current: string | TranslationDictionary = dictionary;

  for (const part of parts) {
    if (typeof current === 'string') return undefined;
    current = (current as TranslationDictionary)[part];
    if (current === undefined) return undefined;
  }

  return typeof current === 'string' ? current : undefined;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Translate a key with the current locale, falling back to English
 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const state = i18nStore.getState();
  const value = lookup(state.translations[state.locale], key) || lookup(state.translations.en, key) || key;

  if (!params) return value;

  // Simple parameter substitution: t('greeting', { name: 'John' }) → "Hello, {name}" → "Hello, John"
  return value.replace(/\{(\w+)\}/g, (_, param) => String(params[param] ?? `{${param}}`));
}

/**
 * Pluralization helper using Intl.PluralRules
 */
export function tn(key: TranslationKey, count: number, params?: Record<string, string | number>): string {
  const pluralRules = new Intl.PluralRules(i18nStore.getState().locale);
  const category = pluralRules.select(count);
  const pluralKey = `${key}.${category}`;
  const resolved = t(pluralKey, { count, ...params });
  return resolved === pluralKey ? t(key, { count, ...params }) : resolved;
}

/**
 * Get the current locale
 */
export function getLocale(): Locale {
  return i18nStore.getState().locale;
}

/**
 * Set the current locale
 */
export function setLocale(locale: Locale): void {
  i18nStore.getState().setLocale(locale);
}

/**
 * Format a number for the current locale
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(getLocale()).format(value);
}

/**
 * Format currency for the current locale
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat(getLocale(), { style: 'currency', currency }).format(value);
}

/**
 * Format a date for the current locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(getLocale(), options).format(d);
}

/**
 * Hook for React components (typed to avoid importing RN hook directly)
 */
export function useTranslation() {
  const locale = i18nStore((s) => s.locale);
  return { t, tn, locale, setLocale, formatNumber, formatCurrency, formatDate };
}

/**
 * Check if text direction is RTL
 */
export function isRTL(): boolean {
  return ['ar', 'he', 'fa', 'ur'].includes(getLocale());
}

// ============================================================================
// Locale Metadata
// ============================================================================

export const LOCALES: Array<{ code: Locale; name: string; nativeName: string; rtl: boolean }> = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
];
