// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';

// ReactDOM.render(<App />, document.getElementById('root'));

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
