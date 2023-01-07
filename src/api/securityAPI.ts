import { instance } from './api'

type GetCaptchaURLResponseType = {
	url: string
}
export const securityAPI = {
	async getCaptchaURL() {
		const response = await instance.get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
		return response.data
	}
}
