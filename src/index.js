import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import ZoomMeeting from './ZoomMeeting';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter >
    <Route exact={true} path="/" component={App} />
    <Route exact={true} path="/zoom-meeting" component={ZoomMeeting} />
  </BrowserRouter>
  ,
  document.getElementById('root')
);