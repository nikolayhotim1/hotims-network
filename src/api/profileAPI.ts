import { PhotosType } from './../types/types'
import { ProfileType } from '../types/types'
import { instance, APIResponseType } from './api'

type SavePhotoResponseDataType = {
	photos: PhotosType
}
export const profileAPI = {
	async getUserProfile(userId: number) {
		const response = await instance.get<ProfileType>(`profile/${userId}`)
		return response.data
	},
	async getUserStatus(userId: number) {
		const response = await instance.get<string>(`profile/status/${userId}`)
		return response.data
	},
	async getUpdateStatus(status: string) {
		const response = await instance.put<APIResponseType>(`profile/status`, {
			status: status
		})
		return response.data
	},
	async savePhoto(file: File) {
		const formData = new FormData()
		formData.append('image', file)
		const response = await instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	},
	async saveProfile(profile: ProfileType) {
		const response = await instance.put<APIResponseType>(`profile`, profile)
		return response.data
	}
}
