import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   {/*Register on Auth0 to get your domain and clientID*/}
<Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin}}
  >
    <App />
  </Auth0Provider>
  
);
