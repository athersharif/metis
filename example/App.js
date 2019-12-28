import React from 'react';
import GoogleSheetsProvider from 'react-db-google-sheets';
import Home from './Home';

const App = () => (
  <GoogleSheetsProvider>
    <Home />
  </GoogleSheetsProvider>
);

export default App;
