import usersReducer, { actions, InitialStateType } from './usersReducer'
let state: InitialStateType
beforeEach(() => {
	state = {
		users: [
			{ id: 1, name: 'Nikolay 1', followed: false, photos: { small: null, large: null }, status: 'My stattus 1' },
			{ id: 2, name: 'Nikolay 2', followed: false, photos: { small: null, large: null }, status: 'My stattus 2' },
			{ id: 3, name: 'Nikolay 3', followed: true, photos: { small: null, large: null }, status: 'My stattus 3' },
			{ id: 4, name: 'Nikolay 4', followed: true, photos: { small: null, large: null }, status: 'My stattus 4' }
		],
		pageSize: 10,
		totalUsersCount: 0,
		currentPage: 1,
		filter: {
			term: '',
			friend: null
		},
		isFetching: false,
		followingInProgress: []
	}
})
test('Follow success user by id', () => {
	const action = actions.followSuccess(2)
	const newState = usersReducer(state, action)
	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeTruthy()
})
test('Unfollow success user by id', () => {
	const action = actions.unfollowSuccess(4)
	const newState = usersReducer(state, action)
	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeFalsy()
})
