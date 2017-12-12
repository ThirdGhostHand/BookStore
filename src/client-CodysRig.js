"use strict"
//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';


import { applyMiddleware, createStore } from 'redux';
import logger  from 'redux-logger';
import thunk from 'redux-thunk';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

//IMPORT ACTIONS
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';

//STORE
const middleware = applyMiddleware(thunk, logger);
//PASSING INITIAL STATE FROM SERVER STORE
const initalState = window.INITIAL_STATE;
const store = createStore(reducers, initalState, middleware);


import routes from './routes'
const Routes = (
    <Provider store={store}>
      {routes}
    </Provider>
    )


render(
    Routes, document.getElementById('app')
    );
