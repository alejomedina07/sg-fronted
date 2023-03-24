import React             from 'react'
import ReactDOM          from 'react-dom/client'
import App               from './App'
import { Provider }      from 'react-redux';
import './index.css'
import './config/i18n/i18n'
import "@fontsource/poppins";

import { BrowserRouter } from 'react-router-dom';
import { store }         from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
