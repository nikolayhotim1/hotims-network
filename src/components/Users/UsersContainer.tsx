import Users from './Users'
import style from './Users.module.css'
import { connect } from 'react-redux'
import { requestUsers, follow, unfollow, FilterType } from '../../redux/usersReducer'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import {
	getUsers,
	getPageSize,
	getTotalUsersCount,
	getCurrentPage,
	getIsFetching,
	getFollowingInProgress,
	getUsersFilter
} from '../../redux/usersSelectors'
import { Component } from 'react'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'

type MapStatePropsType = {
	users: Array<UserType>
	pageSize: number
	currentPage: number
	filter: FilterType
	totalUsersCount: number
	isFetching: boolean
	followingInProgress: Array<number>
}
type MapDispatchPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type OwnPropsType = {
	pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersContainer extends Component<PropsType> {
	componentDidMount() {
		const { currentPage, pageSize, filter } = this.props
		this.props.requestUsers(currentPage, pageSize, filter)
	}
	onPageChanged = (pageNumber: number) => {
		const { pageSize, filter } = this.props
		this.props.requestUsers(pageNumber, pageSize, filter)
	}
	onFilterChanged = (filter: FilterType) => {
		const { pageSize } = this.props
		this.props.requestUsers(1, pageSize, filter)
	}
	render() {
		return (
			<>
				<h1 className={style.title}>{this.props.pageTitle}</h1>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					users={this.props.users}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged={this.onPageChanged}
					onFilterChanged={this.onFilterChanged}
					totalUsersCount={this.props.totalUsersCount}
					followingInProgress={this.props.followingInProgress}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
				/>
			</>
		)
	}
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	users: getUsers(state),
	pageSize: getPageSize(state),
	currentPage: getCurrentPage(state),
	filter: getUsersFilter(state),
	totalUsersCount: getTotalUsersCount(state),
	isFetching: getIsFetching(state),
	followingInProgress: getFollowingInProgress(state)
})
export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
		follow,
		unfollow,
		requestUsers
	})
)(UsersContainer)
