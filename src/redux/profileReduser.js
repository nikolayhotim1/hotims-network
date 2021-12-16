const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Hi! How are you?', likesCount: 20 },
        { id: 2, message: 'It\'s my first post', likesCount: 15 },
        { id: 3, message: 'Forza Juve!', likesCount: 30 },
        { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
    ],

    newPostText: 'Aloha!'
};

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };

            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];

            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';

            return stateCopy;
        }

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };

            stateCopy.newPostText = action.newText;

            return stateCopy;
        }

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export default profileReduser;