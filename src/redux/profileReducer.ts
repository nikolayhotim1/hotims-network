import { PhotosType, PostType, ProfileType } from '../types/types'
import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/profileAPI'

const ADD_POST = 'profileReducer/ADD-POST'
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE'
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS'
const SAVE_PHOTO_SUCCESS = 'profileReducer/SAVE_PHOTO_SUCCESS'
const DELETE_POST = 'profileReducer/DELETE_POST'
const initialState = {
	posts: [
		{ id: 1, message: 'Hi! How are you?', likesCount: 20 },
		{ id: 2, message: "It's my first post", likesCount: 15 },
		{ id: 3, message: 'Forza Juve!', likesCount: 30 },
		{ id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: ''
}
type InitialStateType = typeof initialState
const profileReducer = (
	state = initialState,
	action: any
): InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0
			}
			return {
				...state,
				newPostText: '',
				posts: [...state.posts, newPost]
			}
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		case SET_USER_STATUS: {
			return {
				...state,
				status: action.status
			}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {
					...state.profile,
					photos: action.photos
				} as ProfileType
			}
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter((p) => p.id !== action.postId)
			}
		}
		default:
			return state
	}
}
type AddPostType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPost = (newPostText: string): AddPostType => ({
	type: ADD_POST,
	newPostText
})
type DeletePostType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostType => ({
	type: DELETE_POST,
	postId
})
type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
	type: SET_USER_PROFILE,
	profile
})
type SetUserStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({
	type: SET_USER_STATUS,
	status
})
type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos
})
export const getUserProfile = (userId: number) => {
	return async (dispatch: any) => {
		const data = await profileAPI.getUserProfile(userId)
		dispatch(setUserProfile(data))
	}
}
export const getUserStatus = (userId: number) => {
	return async (dispatch: any) => {
		const data = await profileAPI.getUserStatus(userId)
		dispatch(setUserStatus(data))
	}
}
export const getUpdateStatus = (status: string) => {
	return async (dispatch: any) => {
		try {
			const data = await profileAPI.getUpdateStatus(status)
			if (data.resultCode === 0) {
				dispatch(setUserStatus(status))
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}
}
export const savePhoto = (file: any) => {
	return async (dispatch: any) => {
		const data = await profileAPI.savePhoto(file)
		if (data.resultCode === 0) {
			dispatch(savePhotoSuccess(data.data.photos))
		}
	}
}
export const saveProfile = (profile: ProfileType) => {
	return async (dispatch: any, getState: any) => {
		const userId = getState().auth.id
		const data = await profileAPI.saveProfile(profile)
		if (data.resultCode === 0) {
			dispatch(getUserProfile(userId))
		} else {
			dispatch(stopSubmit('editProfile', { _error: data.messages[0] }))
			return Promise.reject(data.messages[0])
		}
	}
}
export default profileReducer
