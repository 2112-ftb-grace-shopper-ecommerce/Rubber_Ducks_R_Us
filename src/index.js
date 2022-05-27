import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter } from "react-router-dom";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode> )
