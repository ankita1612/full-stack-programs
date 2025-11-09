import { createRoot } from 'react-dom/client'
import './styles/common.css';
import App from './App.jsx'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(  
    <StrictMode>
    <App />  
    </StrictMode>
)
