import style from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import { User } from './User'
import { FC, memo, useEffect } from 'react'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalUsersCount,
	getUsers,
	getUsersFilter
} from '../../redux/usersSelectors'

export const Users: FC = memo(() => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)
	const dispatch = useDispatch()
	const onPageChanged = (pageNumber: number) => {
		dispatch(requestUsers(pageNumber, pageSize, filter))
	}
	const onFilterChanged = (filter: FilterType) => {
		dispatch(requestUsers(1, pageSize, filter))
	}
	const followUser = (userId: number) => {
		dispatch(follow(userId))
	}
	const unfollowUser = (userId: number) => {
		dispatch(unfollow(userId))
	}
	useEffect(() => {
		dispatch(requestUsers(currentPage, pageSize, filter))
	}, [dispatch, currentPage, pageSize, filter])
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
				<User key={u.id} user={u} followingInProgress={followingInProgress} follow={followUser} unfollow={unfollowUser} />
			))}
		</div>
	)
})
