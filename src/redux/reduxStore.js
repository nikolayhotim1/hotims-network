import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReduser from './authReduser';
import dialogsReduser from './dialogsReduser';
import profileReduser from './profileReduser';
import sidebarReduser from './sidebarReduser';
import usersReduser from './usersReduser';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReduser from './appReduser';

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;