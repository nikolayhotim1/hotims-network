import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { FormAction, stopSubmit } from 'redux-form'
import { profileAPI } from '../api/profileAPI'
const initialState = {
	posts: [
		{ id: 1, message: "It's my first post.", likesCount: 15 },
		{ id: 2, message: 'Forza Juve!', likesCount: 30 }
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: ''
}
type InitialStateType = typeof initialState
export const actions = {
	addPost: (newPostText: string) => ({ type: 'hotims-network/profileReducer/ADD-POST', newPostText } as const),
	deletePost: (postId: number) => ({ type: 'hotims-network/profileReducer/DELETE_POST', postId } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'hotims-network/profileReducer/SET_USER_PROFILE', profile } as const),
	setUserStatus: (status: string) => ({ type: 'hotims-network/profileReducer/SET_USER_STATUS', status } as const),
	savePhotoSuccess: (photos: PhotosType) => ({ type: 'hotims-network/profileReducer/SAVE_PHOTO_SUCCESS', photos } as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'hotims-network/profileReducer/ADD-POST': {
			return { ...state, posts: [...state.posts, { id: 3, message: action.newPostText, likesCount: 0 }] }
		}
		case 'hotims-network/profileReducer/DELETE_POST': {
			return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
		}
		case 'hotims-network/profileReducer/SET_USER_PROFILE': {
			return { ...state, profile: action.profile }
		}
		case 'hotims-network/profileReducer/SET_USER_STATUS': {
			return { ...state, status: action.status }
		}
		case 'hotims-network/profileReducer/SAVE_PHOTO_SUCCESS': {
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
		}
		default:
			return state
	}
}
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
export const getUserProfile = (userId: number): ThunkType => {
	return async dispatch => {
		const data = await profileAPI.getUserProfile(userId)
		dispatch(actions.setUserProfile(data))
	}
}
export const getUserStatus = (userId: number): ThunkType => {
	return async dispatch => {
		const data = await profileAPI.getUserStatus(userId)
		dispatch(actions.setUserStatus(data))
	}
}
export const getUpdateStatus = (status: string): ThunkType => {
	return async dispatch => {
		try {
			const data = await profileAPI.getUpdateStatus(status)
			if (data.resultCode === 0) {
				dispatch(actions.setUserStatus(status))
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}
}
export const savePhoto = (file: File): ThunkType => {
	return async dispatch => {
		const data = await profileAPI.savePhoto(file)
		if (data.resultCode === 0) {
			dispatch(actions.savePhotoSuccess(data.data.photos))
		}
	}
}
export const saveProfile = (profile: ProfileType): ThunkType => {
	return async (dispatch, getState) => {
		const userId = getState().auth.id
		const data = await profileAPI.saveProfile(profile)
		if (data.resultCode === 0) {
			if (userId !== null) {
				dispatch(getUserProfile(userId))
			} else {
				throw new Error("userId can't be null")
			}
		} else {
			dispatch(stopSubmit('editProfile', { _error: data.messages[0] }))
			return Promise.reject(data.messages[0])
		}
	}
}
export default profileReducer
