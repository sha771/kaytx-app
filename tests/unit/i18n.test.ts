import { describe, it, expect, beforeEach } from '@jest/globals';
import { t, tn, setLocale, getLocale, formatNumber, formatCurrency, formatDate, isRTL, LOCALES, i18nStore } from '../../app/lib/i18n';

describe('i18n Framework', () => {
  beforeEach(() => {
    setLocale('en');
  });

  describe('Translation (t)', () => {
    it('should translate a simple key', () => {
      expect(t('common.loading')).toBe('Loading...');
    });

    it('should translate nested keys', () => {
      expect(t('auth.signIn')).toBe('Sign In');
      expect(t('navigation.home')).toBe('Home');
    });

    it('should fall back to English for missing translations in other locales', () => {
      setLocale('es');
      // 'common.confirm' is not defined in es, should fall back to en
      expect(t('common.confirm')).toBe('Confirm');
    });

    it('should return the key itself if translation is missing entirely', () => {
      expect(t('nonexistent.deeply.nested.key')).toBe('nonexistent.deeply.nested.key');
    });

    it('should substitute parameters', () => {
      // Register a custom translation with placeholder
      i18nStore.setState((s) => ({
        ...s,
        translations: {
          ...s.translations,
          en: { ...s.translations.en, greeting: 'Hello, {name}!' },
        },
      }));
      expect(t('greeting', { name: 'John' })).toBe('Hello, John!');
    });
  });

  describe('Pluralization (tn)', () => {
    it('should handle singular', () => {
      // Falls back to base key when plural variants missing
      const result = tn('common.loading', 1);
      expect(typeof result).toBe('string');
    });

    it('should handle plural', () => {
      const result = tn('common.loading', 5);
      expect(typeof result).toBe('string');
    });

    it('should handle zero', () => {
      const result = tn('common.loading', 0);
      expect(typeof result).toBe('string');
    });
  });

  describe('Locale Management', () => {
    it('should set and get locale', () => {
      setLocale('fr');
      expect(getLocale()).toBe('fr');
    });

    it('should translate using the set locale', () => {
      setLocale('es');
      expect(t('common.loading')).toBe('Cargando...');
    });

    it('should detect RTL languages', () => {
      setLocale('en');
      expect(isRTL()).toBe(false);
      setLocale('ar');
      expect(isRTL()).toBe(true);
    });
  });

  describe('Formatting', () => {
    it('should format numbers', () => {
      const result = formatNumber(1234567.89);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/1[,.]234[,.]567/);
    });

    it('should format currency', () => {
      const result = formatCurrency(99.99, 'USD');
      expect(typeof result).toBe('string');
      expect(result).toContain('99');
    });

    it('should format dates', () => {
      const result = formatDate(new Date('2026-07-07T12:00:00Z'));
      expect(typeof result).toBe('string');
      expect(result).toContain('2026');
    });
  });

  describe('LOCALES metadata', () => {
    it('should include all supported locales', () => {
      const codes = LOCALES.map((l) => l.code);
      expect(codes).toContain('en');
      expect(codes).toContain('es');
      expect(codes).toContain('ar');
      expect(codes).toContain('zh');
    });

    it('should have native names', () => {
      const spanish = LOCALES.find((l) => l.code === 'es');
      expect(spanish?.nativeName).toBe('Español');
    });

    it('should mark Arabic as RTL', () => {
      const arabic = LOCALES.find((l) => l.code === 'ar');
      expect(arabic?.rtl).toBe(true);
    });
  });
});
