import React, { StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App.jsx';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
