let rerenderEntireTree = () => {
    console.log('State changed');
}

let state = {
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
};

export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };

    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const addMessage = () => {
    let newMessage = {
        id: 6,
        message: state.dialogsPage.newMessageText
    };

    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = '';
    rerenderEntireTree(state);
}

export const updateNewMessageText = (newMessageText) => {
    state.dialogsPage.newMessageText = newMessageText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;