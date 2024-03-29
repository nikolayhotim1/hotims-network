import { APIResponseType } from './../api/api'
import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/objectHelper'
import { Dispatch } from 'redux'
import { usersAPI } from '../api/usersAPI'
const initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	currentPage: 1,
	filter: {
		term: '',
		friend: null as null | boolean
	},
	totalUsersCount: 0,
	isFetching: false,
	followingInProgress: [] as Array<number>
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export const actions = {
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
	setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
	setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
	setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
	toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
		({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'FOLLOW': {
			return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }) }
		}
		case 'UNFOLLOW': {
			return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }) }
		}
		case 'SET_USERS': {
			return { ...state, users: action.users }
		}
		case 'SET_CURRENT_PAGE': {
			return { ...state, currentPage: action.currentPage }
		}
		case 'SET_FILTER': {
			return { ...state, filter: action.payload }
		}
		case 'SET_TOTAL_USERS_COUNT': {
			return { ...state, totalUsersCount: action.totalUsersCount }
		}
		case 'TOGGLE_IS_FETCHING': {
			return { ...state, isFetching: action.isFetching }
		}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}
		}
		default:
			return state
	}
}
const _followUnfollowFlow = async (
	dispatch: Dispatch<ActionsTypes>,
	userId: number,
	apiMethod: (userId: number) => Promise<APIResponseType>,
	actionCreator: (userId: number) => ActionsTypes
) => {
	dispatch(actions.toggleIsFollowingProgress(true, userId))
	const data = await apiMethod(userId)
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(actions.toggleIsFollowingProgress(false, userId))
}
type ThunkType = BaseThunkType<ActionsTypes>
export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		await _followUnfollowFlow(dispatch, userId, usersAPI.getNewFollowedUser.bind(userId), actions.followSuccess)
	}
}
export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		await _followUnfollowFlow(dispatch, userId, usersAPI.getNewUnfollowedUser.bind(userId), actions.unfollowSuccess)
	}
}
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
	return async dispatch => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(page))
		dispatch(actions.setFilter(filter))
		const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
	}
}
export default usersReducer
