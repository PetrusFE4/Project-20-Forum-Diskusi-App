import React from 'react'
import ReactDOM from 'react-dom/client'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext'
import { ModalProvider } from './contexts/ModalContext.jsx'
import AlertTemplate from './components/Alert/AlertTemplate.jsx'

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <ModalProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ModalProvider>
    </AlertProvider>
);
