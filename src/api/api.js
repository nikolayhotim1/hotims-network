import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

    headers: {
        'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(
            `users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data;
        })
    }
};

export const userProfileAPI = {
    getUserProfile(id = 2) {
        return instance.get(
            `profile/${id}`,
        ).then(response => {
            return response.data;
        })
    }
};

export const authAPI = {
    getAuthUserData() {
        return instance.get(
            `auth/me`,
        ).then(response => {
            return response.data;
        })
    }
};

export const followUnfollowAPI = {
    getNewFollowedUser(id = 2) {
        return instance.post(
            `follow/${id}`,
            {}
        ).then(response => {
            return response.data;
        });
    },

    getNewUnfollowedUser(id = 2) {
        return instance.delete(
            `follow/${id}`,
        ).then(response => {
            return response.data;
        });
    }
};