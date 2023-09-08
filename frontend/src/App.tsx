import React from 'react';
import AppProvider from './providers/app';
import AppRoutes from './routes';
import { Container } from '@mui/material';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Container maxWidth='xl'>
        <Header />
        <AppRoutes />
      </Container>
    </AppProvider>
  );
};

export default App;
