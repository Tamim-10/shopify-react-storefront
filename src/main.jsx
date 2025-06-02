import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ShopProvider from './context/shopContext';
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider> 
      <ShopProvider>
        <App />
      </ShopProvider>
    </Provider>
  </StrictMode>  
);  
