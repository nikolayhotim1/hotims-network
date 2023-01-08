import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/objectHelper'
import { Dispatch } from 'redux'
import { usersAPI } from '../api/usersAPI'

const initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState
export const actions = {
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
	setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
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
					: state.followingInProgress.filter((id) => id !== action.userId)
			}
		}
		default:
			return state
	}
}
const _followUnfollowFlow = async (
	dispatch: Dispatch<ActionsTypes>,
	userId: number,
	apiMethod: any,
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
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(page))
		const data = await usersAPI.getUsers(page, pageSize)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
	}
}
export const follow = (userId: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, userId, usersAPI.getNewFollowedUser.bind(userId), actions.followSuccess)
	}
}
export const unfollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollowFlow(dispatch, userId, usersAPI.getNewUnfollowedUser.bind(userId), actions.unfollowSuccess)
	}
}
export default usersReducer
