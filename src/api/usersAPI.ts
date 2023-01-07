import { instance, GetItemsType, APIResponseType } from './api'

export const usersAPI = {
	async getUsers(currentPage: number, pageSize: number) {
		const response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
		return response.data
	},
	async getNewFollowedUser(userId: number) {
		const response = await instance.post<APIResponseType>(`follow/${userId}`, {})
		return response.data
	},
	async getNewUnfollowedUser(userId: number) {
		const response = await instance.delete(`follow/${userId}`)
		return response.data as Promise<APIResponseType>
	}
}
