import { InferActionsTypes } from './reduxStore'
import { getAuthUserData } from './authReducer'
const initialState = {
	initialized: false
}
type InitialStateType = typeof initialState
const actions = {
	initializedSuccess: () => ({ type: 'hotims-network/appReduser/INITIALIZED_SUCCESS' } as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>
const appReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'hotims-network/appReduser/INITIALIZED_SUCCESS': {
			return { ...state, initialized: true }
		}
		default:
			return state
	}
}
export const initializeApp = () => {
	return (dispatch: any) => {
		const promise = dispatch(getAuthUserData())
		Promise.all([promise]).then(() => {
			dispatch(actions.initializedSuccess())
		})
	}
}
export default appReduser
