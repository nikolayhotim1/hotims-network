import { InferActionsTypes, BaseThunkType } from './reduxStore'
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from './../api/api'
import { FormAction, stopSubmit } from 'redux-form'
import { securityAPI } from '../api/securityAPI'
import { authAPI } from '../api/authAPI'

const initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	isFetching: false,
	captchaURL: null as string | null
}
type InitialStateType = typeof initialState
export const actions = {
	setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
		({ type: 'hotims-network/authReduser/SET_AUTH_USER_DATA', payload: { id, email, login, isAuth } } as const),
	getCaptchaURLSuccess: (captchaURL: string) =>
		({ type: 'hotims-network/authReduser/GET_CAPTCHA_URL_SUCCESS', payload: { captchaURL } } as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>
const authReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'hotims-network/authReduser/GET_CAPTCHA_URL_SUCCESS':
		case 'hotims-network/authReduser/SET_AUTH_USER_DATA': {
			return { ...state, ...action.payload }
		}
		default:
			return state
	}
}
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
export const getAuthUserData = (): ThunkType => {
	return async (dispatch) => {
		const data = await authAPI.getAuthUserData()
		if (data.resultCode === ResultCodesEnum.Success) {
			const { id, email, login } = data.data
			dispatch(actions.setAuthUserData(id, email, login, true))
		}
	}
}
export const login = (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null): ThunkType => {
	return async (dispatch) => {
		const data = await authAPI.login(email, password, rememberMe, captcha)
		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
				dispatch(getCaptchaURL())
			}
			const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
			dispatch(stopSubmit('login', { _error: message }))
		}
	}
}
export const getCaptchaURL = (): ThunkType => {
	return async (dispatch) => {
		const data = await securityAPI.getCaptchaURL()
		const captchaURL = data.url
		dispatch(actions.getCaptchaURLSuccess(captchaURL))
	}
}
export const logout = (): ThunkType => {
	return async (dispatch) => {
		const data = await authAPI.logout()
		if (data.resultCode === 0) {
			dispatch(actions.setAuthUserData(null, null, null, false))
		}
	}
}
export default authReduser
