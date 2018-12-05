import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

import store from './store/index';

import '../assets/stylesheets/application.scss';

import Gallery from './components/gallery';
import Cart from './components/cart';

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/cart' component={Cart} />
        <Route path='/' component={Gallery} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
