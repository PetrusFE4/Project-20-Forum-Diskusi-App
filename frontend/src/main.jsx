import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext'
import { ModalProvider } from './contexts/ModalContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ModalProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </ModalProvider>
);
