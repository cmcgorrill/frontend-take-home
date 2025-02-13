import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from "@radix-ui/themes";
import App from './App';
import "@radix-ui/themes/styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);