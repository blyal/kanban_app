import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Navigation } from './Navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue.A700
      // light: '#add8e6', // light blue
      light: '#87BFFF', // light blue
    },
    secondary: {
      main: '#4caf50', // green
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { App };
