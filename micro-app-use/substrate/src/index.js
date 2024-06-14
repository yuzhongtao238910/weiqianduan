import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import microApp from '@micro-zoe/micro-app'

microApp.start()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);


