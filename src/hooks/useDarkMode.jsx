import { useState, useEffect, createContext, useContext, useCallback } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bunyala-dark-mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('bunyala-dark-mode', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}

export default useDarkMode;
