import { ProfileType } from './../types/types';
import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
    }
});
export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async getNewFollowedUser(userId: number) {
        const response = await instance.post(`follow/${userId}`, {});
        return response.data;
    },
    async getNewUnfollowedUser(userId: number) {
        const response = await instance.delete(`follow/${userId}`);
        return response.data;
    }
};
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
};
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
};
type GetAuthUserDataType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
};
type LoginType = {
    data: {
        userId: number
    },
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum,
    messages: Array<string>
};
export const authAPI = {
    async getAuthUserData() {
        const response = await instance.get<GetAuthUserDataType>(`auth/me`);
        return response.data;
    },
    async login(email: string | null, password: string | null, rememberMe = false, captcha: string | null = null) {
        const response = await instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha });
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    }
};
export const securityAPI = {
    async getCaptchaURL() {
        const response = await instance.get(`security/get-captcha-url`);
        return response.data;
    }
};
export const profileAPI = {
    async getUserProfile(userId: number) {
        const response = await instance.get(`profile/${userId}`);
        return response.data;
    },
    async getUserStatus(userId: number) {
        const response = await instance.get(`profile/status/${userId}`);
        return response.data;
    },
    async getUpdateStatus(status: string) {
        const response = await instance.put(`profile/status`, { status: status });
        return response.data;
    },
    async savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file);
        const response = await instance.put(
            `profile/photo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },
    async saveProfile(profile: ProfileType) {
        const response = await instance.put(`profile`, profile);
        return response.data;
    }
};