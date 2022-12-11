import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

    headers: {
        'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(
            `users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data;
        });
    },

    getNewFollowedUser(userId) {
        return instance.post(
            `follow/${userId}`,
            {}
        ).then(response => {
            return response.data;
        });
    },

    getNewUnfollowedUser(userId) {
        return instance.delete(
            `follow/${userId}`
        ).then(response => {
            return response.data;
        });
    }
};

export const authAPI = {
    getAuthUserData() {
        return instance.get(
            `auth/me`
        ).then(response => {
            return response.data;
        });
    },

    login(email, password, rememberMe = false) {
        return instance.post(
            `auth/login`,
            { email, password, rememberMe }
        ).then(response => {
            return response.data;
        });
    },

    logout() {
        return instance.delete(
            `auth/login`
        ).then(response => {
            return response.data;
        });
    }
};

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(
            `profile/${userId}`
        ).then(response => {
            return response.data;
        });
    },

    getUserStatus(userId) {
        return instance.get(
            `profile/status/${userId}`
        ).then(response => {
            return response.data;
        });
    },

    getUpdateStatus(status) {
        return instance.put(
            `profile/status`,
            { status: status }
        ).then(response => {
            return response.data;
        });
    },

    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file);

        return instance.put(
            `profile/photo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            return response.data;
        });
    },

    saveProfile(profile) {
        return instance.put(
            `profile`, profile
        ).then(response => {
            return response.data;
        });
    }
};