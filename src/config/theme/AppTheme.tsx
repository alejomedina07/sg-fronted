import { CssBaseline, ThemeProvider } from '@mui/material';
import { blueTheme }                  from './index';
import { ReactNode }                  from 'react';

interface AppThemeProps {
  children: ReactNode
}

export const AppTheme = ( props: AppThemeProps ) => {
  const { children } = props;
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      { children }
    </ThemeProvider>
  );
}
