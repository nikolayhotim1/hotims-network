import { AppSateType } from './reduxStore';
import { createSelector } from 'reselect';

const getUsersSelector = (state: AppSateType) => {
    return state.usersPage.users;
};
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
});
export const getPageSize = (state: AppSateType) => {
    return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppSateType) => {
    return state.usersPage.totalUsersCount;
};
export const getCurrentPage = (state: AppSateType) => {
    return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppSateType) => {
    return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppSateType) => {
    return state.usersPage.followingInProgress;
};