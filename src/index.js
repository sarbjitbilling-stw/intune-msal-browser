import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as msal from "@azure/msal-browser";

const config = {
    auth: {
        // guid is public client id
        clientId: '49b1a542-3b91-4116-9806-f5770c97f742',
        // guid is tenant
        authority: 'https://login.microsoftonline.com/e15c1e99-7be3-495c-978e-eca7b8ea9f31',
        // redirect uri must match id found in Azure config for app.
        redirectUri: 'http://localhost:8100',
    },
};

const msalInstance = new msal.PublicClientApplication(config);

ReactDOM.render(
    <React.StrictMode>
        <App msal={msalInstance}/>
    </React.StrictMode>,
    document.getElementById('root')
);