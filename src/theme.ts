const baseTheme = {
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    text: 'var(--color-text)',
    surface: 'var(--color-surface)',
    border: 'var(--color-border)',
  },
  typography: {
    h1: {
      fontSize: 'var(--font-size-h1)',
      fontWeight: 'var(--font-weight-h1)',
    },
    h2: {
      fontSize: 'var(--font-size-h2)',
      fontWeight: 'var(--font-weight-h2)',
    },
    body: {
      fontSize: 'var(--font-size-body)',
      fontWeight: 'var(--font-weight-body)',
    },
  },
}

export const lightTheme = {
  ...baseTheme,
  cssVars: {
    '--color-primary': '#007AFF',
    '--color-secondary': '#5856D6',
    '--color-background': '#FFFFFF',
    '--color-text': '#000000',
    '--color-surface': '#F2F2F7',
    '--color-border': '#C7C7CC',
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '2rem',
    '--font-size-h1': '2.5rem',
    '--font-weight-h1': '700',
    '--font-size-h2': '2rem',
    '--font-weight-h2': '600',
    '--font-size-body': '1rem',
    '--font-weight-body': '400',
  }
}

export const darkTheme = {
  ...baseTheme,
  cssVars: {
    ...lightTheme.cssVars,
    '--color-primary': '#0A84FF',
    '--color-secondary': '#5E5CE6',
    '--color-background': '#000000',
    '--color-text': '#FFFFFF',
    '--color-surface': '#1C1C1E',
    '--color-border': '#38383A',
  }
}

export type Theme = typeof baseTheme & { cssVars: Record<string, string> } 