import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';


export const blueTheme = createTheme({

  palette:{
    primary: {
      main:'#0075bf',
    },
    secondary: {
      main:'#049fff'
    },
    error: {
      main: red.A700
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
  typography:{
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  }
})