import * as axios from 'axios';
import React from 'react';
import style from './Users.module.css';
import userPhoto from './../../assets/images/userPhoto.png';
import { NavLink } from 'react-router-dom';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.users_wrapper}>
            <div>
                {pages.map(p => {
                    return (
                        <span
                            className={props.currentPage === p && style.selectedPage}

                            onClick={(e) => {
                                props.onPageChanged(p);
                            }}>{p}
                        </span>
                    )
                })}
            </div>

            {props.users.map(
                u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    src={u.photos.small !== null ? u.photos.small : userPhoto}
                                    alt='My super avatar'
                                    className={style.userPhoto}
                                />
                            </NavLink>

                        </div>

                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
                                            }
                                        }
                                    ).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id);
                                        }
                                    });
                                }}>Unfollow</button>

                                : <button onClick={() => {
                                    axios.post(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {},
                                        {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '7d7c0cc8-9365-47ef-8d77-ea42e5daa598'
                                            }
                                        }
                                    ).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id);
                                        }
                                    });
                                }}>Follow</button>
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
};

export default Users;