import { designTokens } from '~/config/design-tokens';

/**
 * Composable to access design tokens in Vue components
 * Ensures consistent use of colors, typography, and spacing across the app
 */
export const useDesignTokens = () => {
  return {
    colors: designTokens.colors,
    typography: designTokens.typography,
    spacing: designTokens.spacing,
    borderRadius: designTokens.borderRadius,
  };
};

/**
 * Helper to get CSS variable name for a color
 * @example getColorVar('primary') => 'var(--color-primary)'
 */
export const getColorVar = (colorName: string) => {
  return `var(--color-${colorName})`;
};

/**
 * Helper to get Tailwind class for a color
 * @example getColorClass('primary', 'bg') => 'bg-primary'
 * @example getColorClass('grey-500', 'text') => 'text-grey-500'
 */
export const getColorClass = (
  colorName: string,
  type: 'bg' | 'text' | 'border' = 'text'
) => {
  return `${type}-${colorName}`;
};
