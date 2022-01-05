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
    },

    getNewFollowedUser(id = 2) {
        return instance.get(
            `follow/${id}`,
        ).then(response => {
            return response.data;
        });
    }
};

// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     return instance.get(
//         `users?page=${currentPage}&count=${pageSize}`,
//     ).then(response => {
//         return response.data;
//     });
// };

// export const getNewFollowedUser = (id = 2) => {
//     return instance.get(
//         `follow/${id}`,
//     ).then(response => {
//         return response.data;
//     });
// };