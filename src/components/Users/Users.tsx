import style from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { FC } from 'react'
import { UserType } from '../../types/types'
import UsersSearchForm from './UsersSearchForm'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	users: Array<UserType>
	followingInProgress: Array<number>
	onPageChanged: (pageNumber: number) => void
	onFilterChanged: (filter: FilterType) => void
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}
const Users: FC<PropsType> = ({
	totalUsersCount,
	pageSize,
	currentPage,
	users,
	followingInProgress,
	onPageChanged,
	onFilterChanged,
	follow,
	unfollow
}) => {
	return (
		<div className={style.users_wrapper}>
			<UsersSearchForm onFilterChanged={onFilterChanged} />
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChanged={onPageChanged}
			/>
			{users.map((u) => (
				<User key={u.id} user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} />
			))}
		</div>
	)
}
export default Users
