import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReduser from './authReduser';
import dialogsReduser from './dialogsReduser';
import profileReduser from './profileReduser';
import sidebarReduser from './sidebarReduser';
import usersReduser from './usersReduser';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReduser from './appReduser';

let redusers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;