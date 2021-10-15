import { unstable_createMuiStrictModeTheme as createTheme, Theme } from '@material-ui/core/styles';

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    bg: Palette['primary'];
    bgaccent: Palette['primary'];
  }
  interface PaletteOptions {
    bg: PaletteOptions['primary'];
    bgaccent: PaletteOptions['primary'];
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#020887",
    },
    secondary: {
      main: "#D95D39",
    },
    info: {
      main: "#3772FF",
    },
    bg: {
      main: "#EDF0DA",
    },
    bgaccent: {
      main: "#F0DFAD",
    },
    background: {
      default: "#F9F9F9",
    },
  },
});

export default theme;