import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { DARK_THEME, findTheme } from '../themes';

export const ThemeStoreContext = React.createContext();

export function ThemeStoreProvider({ children }) {
  const [theme, setTheme] = useState(findTheme(DARK_THEME));

  return (
    <ThemeStoreContext.Provider value={setTheme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeStoreContext.Provider>
  );
}
