declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      mode: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: {
      mode?: string;
    };
  }
}
