import { APIResponseType, ResultCodesEnum } from '../api/api'
import { usersAPI } from './../api/usersAPI'
import { actions, follow, unfollow } from './usersReducer'
jest.mock('./../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {}
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
	dispatchMock.mockClear()
	getStateMock.mockClear()
})
test('Follow success user thunk', async () => {
	usersAPIMock.getNewFollowedUser.mockReturnValue(Promise.resolve(result))
	const thunk = follow(1)
	await thunk(dispatchMock, getStateMock, {})
	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))
	usersAPIMock.getNewFollowedUser.mockClear()
})
test('Unollow success user thunk', async () => {
	usersAPIMock.getNewUnfollowedUser.mockReturnValue(Promise.resolve(result))
	const thunk = unfollow(1)
	await thunk(dispatchMock, getStateMock, {})
	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))
	usersAPIMock.getNewUnfollowedUser.mockClear()
})
