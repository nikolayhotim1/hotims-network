import { profileAPI } from '../api/api';

const ADD_POST = 'profileReduser/ADD-POST';
const SET_USER_PROFILE = 'profileReduser/SET_USER_PROFILE';
const SET_USER_STATUS = 'profileReduser/SET_USER_STATUS';
const DELETE_POST = 'profileReduser/DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hi! How are you?', likesCount: 20 },
        { id: 2, message: 'It\'s my first post', likesCount: 15 },
        { id: 3, message: 'Forza Juve!', likesCount: 30 },
        { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
    ],

    profile: null,
    status: ''
};

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                newPostText: '',
                posts: [
                    ...state.posts,
                    newPost
                ]
            };
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }

        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => (
    { type: ADD_POST, newPostText }
);

export const setUserProfile = (profile) => (
    { type: SET_USER_PROFILE, profile }
);

export const setUserStatus = (status) => (
    { type: SET_USER_STATUS, status }
);

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId);

        dispatch(setUserProfile(data));
    };
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getUserStatus(userId);

        dispatch(setUserStatus(data));
    };
}

export const getUpdateStatus = (status) => {
    return async (dispatch) => {
        let data = await profileAPI.getUpdateStatus(status);

        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    };
}

export const deletePost = (postId) => (
    { type: DELETE_POST, postId }
);

export default profileReduser;