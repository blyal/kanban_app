import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <div>
        <Router>
          <Layout />
          <Routes>
            <Route path='/' element={<div>Default</div>} />
            <Route path='/boards' element={<div>Boards</div>} />
            <Route path='/*' element={<div>404</div>} />
          </Routes>
        </Router>
        {/* main content */}
      </div>
    </ThemeProvider>
  );
}

export { App };
