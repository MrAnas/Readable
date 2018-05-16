import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reducer from './reducers'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
<Provider store={this.store}>
<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
