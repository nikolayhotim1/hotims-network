import Users from './Users';
import style from './Users.module.css';
import { connect } from 'react-redux';
import { requestUsers, follow, unfollow } from '../../redux/usersReducer';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';
import { Component } from 'react';
import { UserType } from '../../types/types';
import { AppSateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    isFetching: boolean
};
type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};
type OwnPropsType = {
    pageTitle: string
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    };
    render() {
        return (
            <>
                <h1 className={style.title}>{this.props.pageTitle}</h1>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}
const mapStateToProps = (state: AppSateType): MapStatePropsType => ({
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    users: getUsers(state),
    followingInProgress: getFollowingInProgress(state),
    isFetching: getIsFetching(state)
});
export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppSateType>(
    mapStateToProps,
    { requestUsers, follow, unfollow }
))(UsersContainer);