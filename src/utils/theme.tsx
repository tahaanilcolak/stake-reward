import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { style } from './style';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode : "light",
    primary: {
      main: '#556cd6',
      light : ""
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiListItemText : {
      styleOverrides : {
        root : {
          fontSize : "14px"
        }
      }
    },
    MuiTab : {
      styleOverrides : {
        root : {
          color : style.mainColor,
          fontWeight : 600
        },
        textColorPrimary : {
          color : "#9F7FE3",
        },
        
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: style.mainColor,
          height: 3,
        },
      },
    },
    MuiAccordion : {
      styleOverrides : {
        root : {
          '&:before': {
            display: 'none',
          },
        }
      }
    }
  },
});

export default theme;