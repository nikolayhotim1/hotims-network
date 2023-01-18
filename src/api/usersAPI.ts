import { instance, GetItemsType, APIResponseType } from './api'

export const usersAPI = {
	async getNewFollowedUser(userId: number) {
		const response = await instance.post<APIResponseType>(`follow/${userId}`, {})
		return response.data
	},
	async getNewUnfollowedUser(userId: number) {
		const response = await instance.delete(`follow/${userId}`)
		return response.data as Promise<APIResponseType>
	},
	async getUsers(page: number, pageSize: number, term: string = '', friend: null | boolean = null) {
		const friendData = friend === null ? '' : `&friend=${friend}`
		const response = await instance.get<GetItemsType>(`users?page=${page}&count=${pageSize}&term=${term}${friendData}`)
		return response.data
	}
}
