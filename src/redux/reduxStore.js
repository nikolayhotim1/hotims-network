import { combineReducers, createStore } from 'redux';
import dialogsReduser from './dialogsReduser';
import profileReduser from './profileReduser';
import sidebarReduser from './sidebarReduser';
import usersReduser from './usersReduser';

let redusers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser
});

let store = createStore(redusers);

window.store = store;

export default store;