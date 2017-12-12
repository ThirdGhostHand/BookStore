"use strict"
//React
import React from 'react';
import { render } from 'react-dom';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';


import { applyMiddleware, createStore } from 'redux';
import logger  from 'redux-logger';
import thunk from 'redux-thunk';

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const routes = (
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={BooksList}/>
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart" component={Cart}/>
            </Route>
        </Router>
    );

export default routes
