import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";
import sidebarReduser from "./sidebarReduser";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi! How are you?', likesCount: 20 },
                { id: 2, message: 'It\'s my first post', likesCount: 15 },
                { id: 3, message: 'Forza Juve!', likesCount: 30 },
                { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
            ],

            newPostText: 'Aloha!'
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Andrey' },
                { id: 2, name: 'Denis' },
                { id: 3, name: 'Katya' },
                { id: 4, name: 'Mum' },
                { id: 5, name: 'Dad' }
            ],

            messages: [
                { id: 1, message: 'Hi!' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'Yo!' },
                { id: 4, message: 'Yo!' },
                { id: 5, message: 'Yo!' }
            ],

            newMessageText: 'Guten Tag!'
        },

        sidebar: {
            // some code for sidebar showing few my friends
        }
    },

    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };

        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },

    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },

    addMessage() {
        let newMessage = {
            id: 6,
            message: this._state.dialogsPage.newMessageText
        };

        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = '';
        this._callSubscriber(this._state);
    },

    updateNewMessageText(newMessageText) {
        this._state.dialogsPage.newMessageText = newMessageText;
        this._callSubscriber(this._state);
    },

    dispatch(action) {
        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReduser(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};

export default store;
// window.store = store;