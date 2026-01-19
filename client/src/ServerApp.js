import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import SSRProvider from 'react-bootstrap/SSRProvider';
import App from './App';

const ServerApp = (url) => {
    return (
        <SSRProvider>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </SSRProvider>
    );
};
export default ServerApp;
