import { ResultCodesEnum, ResultCodeForCaptchaEnum } from './../api/api'
import { stopSubmit } from 'redux-form'
import { securityAPI } from '../api/securityAPI'
import { authAPI } from '../api/authAPI'

const SET_AUTH_USER_DATA = 'authReduser/SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'authReduser/GET_CAPTCHA_URL_SUCCESS'
const initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaURL: null as string | null
}
type InitialStateType = typeof initialState
const authReduser = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case GET_CAPTCHA_URL_SUCCESS:
		case SET_AUTH_USER_DATA: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state
	}
}
type SetAuthUserDataType = {
	type: typeof SET_AUTH_USER_DATA
	payload: {
		id: number | null
		email: string | null
		login: string | null
		isAuth: boolean
	}
}
export const setAuthUserData = (
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
): SetAuthUserDataType => ({
	type: SET_AUTH_USER_DATA,
	payload: { id, email, login, isAuth }
})
type GetCaptchaURLSuccessType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	payload: { captchaURL: string }
}
export const getCaptchaURLSuccess = (
	captchaURL: string
): GetCaptchaURLSuccessType => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaURL }
})
export const getAuthUserData = () => {
	return async (dispatch: any) => {
		const data = await authAPI.getAuthUserData()
		if (data.resultCode === ResultCodesEnum.Success) {
			const { id, email, login } = data.data
			dispatch(setAuthUserData(id, email, login, true))
		}
	}
}
export const login = (
	email: string | null,
	password: string | null,
	rememberMe: boolean,
	captcha: string | null
) => {
	return async (dispatch: any) => {
		const data = await authAPI.login(email, password, rememberMe, captcha)
		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (
				data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired
			) {
				dispatch(getCaptchaURL())
			}
			const message =
				data.messages.length > 0 ? data.messages[0] : 'Some error'
			dispatch(stopSubmit('login', { _error: message }))
		}
	}
}
export const getCaptchaURL = () => {
	return async (dispatch: any) => {
		const data = await securityAPI.getCaptchaURL()
		const captchaURL = data.url
		dispatch(getCaptchaURLSuccess(captchaURL))
	}
}
export const logout = () => {
	return async (dispatch: any) => {
		const data = await authAPI.logout()
		if (data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false))
		}
	}
}
export default authReduser
