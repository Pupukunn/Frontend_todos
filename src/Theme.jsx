import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: '#4a5565' },
    secondary: { main: '#ffffff' },
    tertiary: { main: '#7F8CAA' },
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1200,
      xxl: 1400,
    },
  },
});

export default theme;