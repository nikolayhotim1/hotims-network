const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        // { id: 1, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: false, fullName: 'Nina Hotim', status: 'I am working hard', location: { city: 'Grodno', country: 'Belarus' } },
        // { id: 2, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: true, fullName: 'Matvey Hotim', status: 'I am working hard too', location: { city: 'Minsk', country: 'Belarus' } },
        // { id: 3, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: false, fullName: 'Katty Hotim', status: 'I am working very hard', location: { city: 'Mogilev', country: 'Belarus' } }
    ]
};

const usersReduser = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,

                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }

                    return u;
                })
            };
        }

        case UNFOLLOW: {
            return {
                ...state,

                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }

                    return u;
                })
            };
        }

        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] };
        }

        default:
            return state;
    }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReduser;