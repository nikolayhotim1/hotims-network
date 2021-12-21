import * as axios from 'axios';
import React from 'react';
import style from './Users.module.css';
import userPhoto from './../../assets/images/userPhoto.png';

let Users = (props) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items);
            });
        }
    }

    return (
        <div className={style.users_wrapper}>
            <button onClick={getUsers}>Get users</button>
            {props.users.map(
                u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt='My super avatar' className={style.userPhoto} />
                        </div>

                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>
                            }
                        </div>
                    </span>

                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>

                        <span>
                            <div>{'u.location.city'}</div>
                            <div>{'u.location.country'}</div>
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Users;