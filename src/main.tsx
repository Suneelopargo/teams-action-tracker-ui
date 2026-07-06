import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './index.css';

import App from './App';

import AuthProvider from './auth/AuthProvider';

ModuleRegistry.registerModules([
  AllCommunityModule,
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);