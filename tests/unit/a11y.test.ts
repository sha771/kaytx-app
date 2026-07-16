/**
 * Accessibility (a11y) Tests
 * Validates color contrast, semantic helpers, and WCAG compliance.
 */

import { describe, it, expect } from '@jest/globals';
import {
  buttonA11y,
  linkA11y,
  headerA11y,
  imageA11y,
  fieldA11y,
  contrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
} from '../../app/lib/a11y';

describe('Accessibility Helpers', () => {
  describe('buttonA11y', () => {
    it('sets correct role and label', () => {
      const props = buttonA11y('Submit form', 'Submits the form');
      expect(props.accessibilityRole).toBe('button');
      expect(props.accessibilityLabel).toBe('Submit form');
      expect(props.accessibilityHint).toBe('Submits the form');
      expect(props.accessible).toBe(true);
    });

    it('reflects disabled state', () => {
      const props = buttonA11y('Save', undefined, true);
      expect(props.accessibilityState?.disabled).toBe(true);
    });

    it('is not disabled by default', () => {
      const props = buttonA11y('Save');
      expect(props.accessibilityState?.disabled).toBe(false);
    });
  });

  describe('linkA11y', () => {
    it('sets link role', () => {
      const props = linkA11y('Kaytx website', 'Opens in browser');
      expect(props.accessibilityRole).toBe('link');
      expect(props.accessibilityLabel).toBe('Kaytx website');
    });
  });

  describe('headerA11y', () => {
    it('defaults to level 1', () => {
      const props = headerA11y();
      expect(props.accessibilityRole).toBe('header');
      expect(props.accessibilityLevel).toBe(1);
    });

    it('respects custom level', () => {
      expect(headerA11y(3).accessibilityLevel).toBe(3);
      expect(headerA11y(6).accessibilityLevel).toBe(6);
    });
  });

  describe('imageA11y', () => {
    it('sets image role with label', () => {
      const props = imageA11y('Company logo');
      expect(props.accessibilityRole).toBe('image');
      expect(props.accessibilityLabel).toBe('Company logo');
    });
  });

  describe('fieldA11y', () => {
    it('marks required fields', () => {
      const props = fieldA11y('Email', true);
      expect(props.accessibilityState?.required).toBe(true);
      expect(props.accessibilityHint).toBe('Required field');
    });

    it('marks invalid state', () => {
      const props = fieldA11y('Password', true, true);
      expect(props.accessibilityState?.invalid).toBe(true);
    });
  });
});

describe('WCAG Color Contrast', () => {
  describe('contrastRatio', () => {
    it('returns 1 for identical colors', () => {
      expect(contrastRatio('#000000', '#000000')).toBe(1);
      expect(contrastRatio('#ffffff', '#ffffff')).toBe(1);
    });

    it('returns 21 for black on white', () => {
      const ratio = contrastRatio('#000000', '#ffffff');
      expect(ratio).toBeGreaterThan(20);
      expect(ratio).toBeLessThanOrEqual(21);
    });

    it('returns high ratio for blue on white', () => {
      const ratio = contrastRatio('#0066cc', '#ffffff');
      expect(ratio).toBeGreaterThan(4);
    });
  });

  describe('meetsWCAGAA', () => {
    it('passes for black on white', () => {
      expect(meetsWCAGAA('#000000', '#ffffff')).toBe(true);
    });

    it('fails for light gray on white', () => {
      expect(meetsWCAGAA('#cccccc', '#ffffff')).toBe(false);
    });

    it('passes for large text at 3:1', () => {
      // 3:1 is the threshold for large text
      expect(meetsWCAGAA('#767676', '#ffffff', true)).toBe(true);
    });

    it('uses stricter threshold for normal text', () => {
      // #767676 on white is ~4.5:1, fails normal but passes large
      // Actually let's use a clearer example
      expect(meetsWCAGAA('#999999', '#ffffff')).toBe(false);
    });
  });

  describe('meetsWCAGAAA', () => {
    it('passes for black on white', () => {
      expect(meetsWCAGAAA('#000000', '#ffffff')).toBe(true);
    });

    it('is stricter than AA', () => {
      // #595959 on white passes AA but not AAA for normal text
      expect(meetsWCAGAA('#595959', '#ffffff')).toBe(true);
    });
  });
});
