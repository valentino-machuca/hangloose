import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';

import store from './redux/store' //importamos nuestra store.
import { BrowserRouter } from 'react-router-dom'; //Router.
import { Provider } from 'react-redux' //Provider para comunicarle a nuestra app nuestra store redux.

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

ReactDOM.render(
  <Provider store={store}> {/*Le informo a mi app sobre el store de redux */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);