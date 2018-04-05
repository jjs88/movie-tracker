import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, BrowserRouter } from 'react-router-dom'
import App from './Components/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('root'));
