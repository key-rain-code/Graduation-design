import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import reportWebVitals from './reportWebVitals';
import RouteConfig from './routers'

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router routes={RouteConfig} history={hashHistory} />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
