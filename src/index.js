// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';

// ReactDOM.render(<App />, document.getElementById('root'));

import React, { StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
