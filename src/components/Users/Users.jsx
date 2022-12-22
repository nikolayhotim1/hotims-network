import React from 'react';
import style from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProgress, follow, unfollow }) => {
    return (
        <div className={style.users_wrapper}>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {users.map(u => (
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}
                />
            ))}
        </div>
    );
};

export default Users;