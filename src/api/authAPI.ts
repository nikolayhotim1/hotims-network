import { instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from './api'
type GetAuthUserResponseDataType = {
	id: number
	email: string
	login: string
}
type LoginResponseDataType = {
	userId: number
}
export const authAPI = {
	async getAuthUserData() {
		const response = await instance.get<APIResponseType<GetAuthUserResponseDataType>>('auth/me')
		return response.data
	},
	async login(email: string | null, password: string | null, rememberMe = false, captcha: string | null = null) {
		const response = await instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(
			'auth/login',
			{
				email,
				password,
				rememberMe,
				captcha
			}
		)
		return response.data
	},
	async logout() {
		const response = await instance.delete('auth/login')
		return response.data
	}
}
