import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import {Provider} from 'react-redux';
import {store, persistedStore} from './redux/store.jsx';
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
 <ThemeProvider>
    <Provider store={store}>
      <PersistGate persistor= {persistedStore}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate> 
    </Provider> 
 </ThemeProvider>
 
)
