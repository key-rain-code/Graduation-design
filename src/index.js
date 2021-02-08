import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import { getRoutes } from './routers';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router routes={getRoutes()} history={hashHistory} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
