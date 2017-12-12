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
const store = createStore(reducers, middleware);

import BooksList from './components/pages/bookslist';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={BooksList}/>
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
            </Route>
        </Router>
    </Provider>
    )


render(
    Routes, document.getElementById('app')
    );

//ACTIONS