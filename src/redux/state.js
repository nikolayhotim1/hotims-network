import { rerenderEntireTree } from './../render';

let state = {
    profilePage: {
        posts: [
            { id: 1, message: 'Hi! How are you?', likesCount: 20 },
            { id: 2, message: 'It\'s my first post', likesCount: 15 },
            { id: 3, message: 'Forza Juve!', likesCount: 30 },
            { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
        ]
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
        ]
    },

    sidebar: {
        // some code for sidebar showing few my friends
    }
};

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0
    };

    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state;