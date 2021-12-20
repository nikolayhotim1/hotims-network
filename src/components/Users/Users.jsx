import React from "react";
import style from './Users.module.css';

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            { id: 1, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: false, fullName: 'Nina Hotim', status: 'I am working hard', location: { city: 'Grodno', country: 'Belarus' } },
            { id: 2, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: true, fullName: 'Matvey Hotim', status: 'I am working hard too', location: { city: 'Minsk', country: 'Belarus' } },
            { id: 3, photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/31992724-f0bd-4099-9e9b-1db8966f8464/280x420', followed: false, fullName: 'Katty Hotim', status: 'I am working very hard', location: { city: 'Mogilev', country: 'Belarus' } }
        ]);
    }

    return (
        <div className={style.users_wrapper}>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} alt="My super avatar" className={style.userPhoto} />
                        </div>

                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                        </div>
                    </span>

                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>

                        <span>
                            <div>{u.location.city}</div>
                            <div>{u.location.country}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
}

export default Users;