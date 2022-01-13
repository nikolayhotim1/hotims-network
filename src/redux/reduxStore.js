import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReduser from './authReduser';
import dialogsReduser from './dialogsReduser';
import profileReduser from './profileReduser';
import sidebarReduser from './sidebarReduser';
import usersReduser from './usersReduser';
import thunkMiddleware from 'redux-thunk';

let redusers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser,
    auth: authReduser
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;