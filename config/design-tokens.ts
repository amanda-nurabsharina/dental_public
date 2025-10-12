/**
 * Design System Tokens
 * Single source of truth for all design tokens used across Tailwind and Vuetify
 * Import this file to keep themes synchronized
 */

export const designTokens = {
  colors: {
    // Primary Colors
    primary: '#00813D',
    'primary-20': '#DFF5EA',

    // Secondary Colors
    'secondary-1': '#009245',
    'secondary-2': '#00A24B',

    // Base Colors
    white: '#FFFFFF',
    black: '#000000',
    background: '#F6F8FA',

    // Grey Scale
    'grey-50': '#F9FAFB',
    'grey-100': '#F3F4F6',
    'grey-200': '#E5E7EB',
    'grey-300': '#D1D5DB',
    'grey-400': '#9CA3AF',
    'grey-500': '#6B7280',
    'grey-600': '#4B5563',
    'grey-700': '#374151',
    'grey-800': '#1F2937',
    'grey-900': '#111827',

    // Info Colors
    'info-50': '#E1E9FE',
    'info-100': '#67B2E0',
    'info-200': '#4EA6DB',
    'info-300': '#3499D5',
    'info-400': '#1B8CD1',
    'info-500': '#017FCB',
    'info-600': '#017FCB',

    // Success Colors
    'success-50': '#F2FDF5',
    'success-100': '#D3F3DF',
    'success-200': '#A7E8BF',
    'success-300': '#7ADC9E',
    'success-400': '#4ED17E',
    'success-500': '#22C55E',
    'success-600': '#16A34A',
    'success-700': '#147638',
    'success-800': '#0E4F26',
    'success-900': '#072713',

    // Warning Colors
    'warning-50': '#FFFBEB',
    'warning-100': '#FDECCE',
    'warning-200': '#FBD89D',
    'warning-300': '#F9C56D',
    'warning-400': '#F7B13C',
    'warning-500': '#F59E0B',
    'warning-600': '#D97706',
    'warning-700': '#A96E09',
    'warning-800': '#623F04',
    'warning-900': '#312002',

    // Danger Colors
    'danger-50': '#FFF1F2',
    'danger-100': '#FDD9DF',
    'danger-200': '#FBB2BF',
    'danger-300': '#F88C9E',
    'danger-400': '#F6657E',
    'danger-500': '#F43F5E',
    'danger-600': '#E11C48',
    'danger-700': '#B4173A',
    'danger-800': '#621926',
    'danger-900': '#310D13',
  },

  typography: {
    fontFamily: {
      sans: "'Urbanist', ui-sans-serif, system-ui, sans-serif",
    },
    fontSize: {
      xs: '0.5rem', // 8px
      sm: '0.75rem', // 12px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.75rem', // 28px
      '4xl': '2.25rem', // 36px
      '5xl': '2.5rem', // 40px
      '6xl': '3.5rem', // 56px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  spacing: {
    // Use Tailwind's default spacing scale
    // This is just for reference
    // 1 = 0.25rem (4px)
    // 2 = 0.5rem (8px)
    // 4 = 1rem (16px)
    // 6 = 1.5rem (24px)
    // 8 = 2rem (32px)
    // etc.
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
} as const;

// Helper function to convert design tokens to Vuetify theme format
export function getVuetifyTheme() {
  return {
    dark: false,
    colors: {
      // Map design tokens to Vuetify color names
      primary: designTokens.colors.primary,
      'primary-20': designTokens.colors['primary-20'],
      secondary: designTokens.colors['secondary-1'],
      'secondary-1': designTokens.colors['secondary-1'],
      'secondary-2': designTokens.colors['secondary-2'],

      background: designTokens.colors.background,
      surface: designTokens.colors.white,

      // Standard Vuetify semantic colors
      success: designTokens.colors['success-500'],
      warning: designTokens.colors['warning-500'],
      error: designTokens.colors['danger-500'],
      info: designTokens.colors['info-500'],

      // Additional colors
      white: designTokens.colors.white,
      black: designTokens.colors.black,
    },
  };
}

// Export type for TypeScript support
export type DesignTokens = typeof designTokens;
export type ColorTokens = keyof typeof designTokens.colors;
