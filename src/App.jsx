import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <AppRoutes />
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
