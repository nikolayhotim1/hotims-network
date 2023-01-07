import { getAuthUserData } from './authReducer'

const INITIALIZED_SUCCESS = 'appReduser/INITIALIZED_SUCCESS'
const initialState = {
	initialized: false
}
type InitialStateType = typeof initialState
const appReduser = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS: {
			return {
				...state,
				initialized: true
			}
		}
		default:
			return state
	}
}
type InitializedSuccessType = {
	type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessType => ({ type: INITIALIZED_SUCCESS })
export const initializeApp = () => {
	return (dispatch: any) => {
		const promise = dispatch(getAuthUserData())
		Promise.all([promise]).then(() => {
			dispatch(initializedSuccess())
		})
	}
}
export default appReduser
