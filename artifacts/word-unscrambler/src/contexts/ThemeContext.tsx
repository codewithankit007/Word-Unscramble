import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'custom';

export interface CustomSettings {
  hue: number;
  base: 'light' | 'dark';
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  custom: CustomSettings;
  setCustom: (s: CustomSettings) => void;
}

const defaultCustom: CustomSettings = { hue: 221, base: 'light' };

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  custom: defaultCustom,
  setCustom: () => {},
});

function applyCustomVars(hue: number, base: 'light' | 'dark') {
  const root = document.documentElement;
  root.style.setProperty('--custom-hue', String(hue));
  if (base === 'dark') {
    root.classList.add('custom-dark');
  } else {
    root.classList.remove('custom-dark');
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem('wu-theme') as Theme) || 'light'
  );
  const [custom, setCustomState] = useState<CustomSettings>(() => {
    try {
      return JSON.parse(localStorage.getItem('wu-custom') || 'null') || defaultCustom;
    } catch { return defaultCustom; }
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('wu-theme', t);
  };

  const setCustom = (s: CustomSettings) => {
    setCustomState(s);
    localStorage.setItem('wu-custom', JSON.stringify(s));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-custom');
    root.classList.add(`theme-${theme}`);
    if (theme === 'custom') {
      applyCustomVars(custom.hue, custom.base);
    } else {
      root.style.removeProperty('--custom-hue');
      root.classList.remove('custom-dark');
    }
  }, [theme, custom]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, custom, setCustom }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
