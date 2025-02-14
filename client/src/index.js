import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from "@radix-ui/themes";
import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "@radix-ui/themes/styles.css";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <App />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode >
);