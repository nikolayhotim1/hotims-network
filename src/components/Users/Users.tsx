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
import { useLocation, useNavigate } from 'react-router'
import * as queryString from 'querystring'

export const Users: FC = memo(() => {
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const users = useSelector(getUsers)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
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
	type QueryParamsType = {
		term?: string
		page?: string
		friend?: string
	}
	useEffect(() => {
		const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType
		let actualPage = currentPage
		let actualFilter = filter
		if (!!parsed.page) actualPage = Number(parsed.page)
		if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
		switch (parsed.friend) {
			case 'null':
				actualFilter = { ...actualFilter, friend: null }
				break
			case 'true':
				actualFilter = { ...actualFilter, friend: true }
				break
			case 'false':
				actualFilter = { ...actualFilter, friend: false }
				break
			default:
				break
		}
		dispatch(requestUsers(actualPage, pageSize, actualFilter))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		const query: QueryParamsType = {}
		if (!!filter.term) query.term = filter.term
		if (filter.friend !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)
		navigate({
			pathname: '/users',
			search: queryString.stringify(query)
		})
	}, [navigate, filter, currentPage])
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
