import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import userReducer from './store/userReducer';
import dataReducer from './store/dataReducer';
import thunkMiddleware from 'redux-thunk';

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    data: dataReducer,
    user: userReducer,
    router: connectRouter(history),
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
];

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, persistedState, enhancers);

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.log(e);
    }
};

store.subscribe(() => {
    saveToLocalStorage({
        user: {
            user: store.getState().user.user,
            loginError: null,
            registerError: null,
            history: []
        }
    })
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
