import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux';

import store from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
  <Router>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
  </Provider>

, document.getElementById('root'));
registerServiceWorker();

