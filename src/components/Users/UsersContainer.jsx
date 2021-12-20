import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC } from "../../redux/usersReduser";
import Users from "./Users";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },

        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },

        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    }
};

const UsersConatainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersConatainer;