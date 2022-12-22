import { getAuthUserData } from './authReduser';

const INITIALIZED_SUCCESS = 'appReduser/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
    globalError: null
};

const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }
        default:
            return state;
    }
};

export const initializedSuccess = () => (
    { type: INITIALIZED_SUCCESS }
);

export const initializeApp = () => {
    return (dispatch) => {
        const promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        });
    };
};

export default appReduser;