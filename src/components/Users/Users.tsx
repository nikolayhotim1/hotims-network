import style from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { FC } from 'react';
import { UserType } from '../../types/types';

type UsersType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    onPageChanged: (pageNumber: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};
const Users: FC<UsersType> = ({
    totalUsersCount,
    pageSize,
    currentPage,
    users,
    followingInProgress,
    onPageChanged,
    follow,
    unfollow
}) => {
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