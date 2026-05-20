export const theme = {
  colors: {
    primary: '#4F46E5', // Indigo 600
    primaryLight: '#818CF8',
    primaryDark: '#3730A3',
    secondary: '#10B981', // Emerald 500
    background: '#F9FAFB', // Gray 50
    surface: '#FFFFFF',
    text: '#111827', // Gray 900
    textSecondary: '#6B7280', // Gray 500
    error: '#EF4444',
    border: '#E5E7EB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  fonts: {
    sizes: {
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    weight: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    }
  }
};

export const API_BASE_URL = 'http://localhost:3000/api';
