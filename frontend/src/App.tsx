import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Layout } from './layout/Layout';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue.A700
    },
    secondary: {
      main: '#4caf50', // green
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export { App };
