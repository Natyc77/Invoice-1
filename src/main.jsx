import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/i18n';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  </>
);