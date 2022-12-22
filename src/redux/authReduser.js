import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_AUTH_USER_DATA = 'authReduser/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'authReduser/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaURL: null
};

const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }
};

export const setAuthUserData = (id, email, login, isAuth) => (
    { type: SET_AUTH_USER_DATA, payload: { id, email, login, isAuth } }
);

export const getCaptchaURLSuccess = (captchaURL) => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaURL } }
);

export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuthUserData();

        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    };
};

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);

        if (data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaURL());
            }

            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', { _error: message }));
        }
    };
};

export const getCaptchaURL = () => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaURL();
        const captchaURL = data.url;
        dispatch(getCaptchaURLSuccess(captchaURL));
    };
};

export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    };
};

export default authReduser;