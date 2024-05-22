import { createTheme } from "@mui/material";


const font = "'Rethink Sans', sans-serif";


export const FinoTheme = (mode) => {

  return createTheme({
    shadows: 0,
    palette: {
      primary: { main: "#0a2472" },
      secondary: { main: '#00509d' },
      info:{main:"#ff99c8"},
      white: { main: '#FFF' },
      p1:{ main: '#1976d2',contrastText: "#FFF" }, //blue
      p2:{ main: '#ff6700',contrastText: "#FFF" }, //orange
      p3:{ main: '#FFF',contrastText: "#000" }, //white

         // mode:"dark"
    },
    typography: {
      fontFamily: font, fontSize: 14,
      h1: { fontFamily: font, fontWeight: 500 },
      v1: { fontFamily: font, fontWeight: 800, fontSize: 20, letterSpacing: 2 },
      v2: { fontFamily: font, fontWeight: 800, fontSize: 13, letterSpacing: 1 },
      v3: { fontFamily: font, fontWeight: 800, fontSize: 18 },
      v4: { fontFamily: font, fontWeight: 900, fontSize: 23 },
      v5: { fontFamily: font, fontWeight: 800, fontSize: 14, letterSpacing: 1.5 },
    },

  });
}

