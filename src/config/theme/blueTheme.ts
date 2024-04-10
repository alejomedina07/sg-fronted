import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const blueTheme = createTheme({
  palette: {
    primary: {
      // main: '#0075bf',
      main: '#008054',
    },
    secondary: {
      // main: '#049fff',
      main: '#f89b1e',
      light: '#049fff',
      dark: '#049fff',
    },
    error: {
      main: red.A700,
    },
    background: {
      // table: red.A700
    },
    // colorInherit: {
    //     color: 'inherit',
    //     borderColor: 'currentColor',
    // },
  },
  // overrides: {
  //   MuiButton: {
  //     raisedPrimary: {
  //       color: 'white',
  //     },
  //   },
  // },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});
