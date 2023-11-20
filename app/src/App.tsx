import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Router from './router/router';
import { theme } from './theme';
import './App.css';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router></Router>
    </ChakraProvider>
  );
};

export default App;
