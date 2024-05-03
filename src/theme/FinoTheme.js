import { createTheme } from "@mui/material";

const { palette } = createTheme();
const font = "'Rethink Sans', sans-serif";


export const FinoTheme = (mode) => {

  return createTheme({
    shadows: 0,
    palette: {
      primary: { main: "#003566" },
      secondary: { main: '#00509d' },
      white: { main: '#FFF' },
      p1: palette?.augmentColor({ color: { main: '#1976d2' }, name: 'p1', }),
      //    mode:mode
    },
    typography: {
      fontFamily: font, fontSize: 14,
      h1: { fontFamily: font, fontWeight: 500 },
      v1: { fontFamily: font, fontWeight: 800, fontSize: 20, letterSpacing: 2 },
      v2: { fontFamily: font, fontWeight: 800, fontSize: 13, letterSpacing: 1 },
      v3: { fontFamily: font, fontWeight: 800, fontSize: 18 }
    },

  });
}

