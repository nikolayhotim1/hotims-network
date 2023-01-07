import { UserType } from './../types/types'
import axios from 'axios'

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
	}
})
export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}
export enum ResultCodeForCaptchaEnum {
	CaptchaIsRequired = 10
}
export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D
	resultCode: RC
	messages: Array<string>
}
