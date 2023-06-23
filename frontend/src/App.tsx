import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Navigation } from './navigation/Navigation';
import { BoardsProvider } from './context/boardsContext';
import { ModalProvider } from './context/modalContext';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 0, 0)',
      light: 'rgba(0, 0, 0, 0.5)',
      // main: '#1976d2', // blue.A700
      // light: '#87BFFF', // light blue
    },
    secondary: {
      // main: '#4caf50', // green
      main: 'rgb(255, 255, 255)',
      light: 'rgb(245, 245, 220)',
    },
    warning: {
      main: 'rgb(255, 51, 51)',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoardsProvider>
            <ModalProvider>
              <Navigation />
            </ModalProvider>
          </BoardsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export { App };
