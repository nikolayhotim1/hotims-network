import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useMatch } from 'react-router-dom';
import { getUserProfile } from '../../redux/profileReduser';
import Profile from './Profile';

const myId = 21659;

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : myId;
        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return <Navigate to={'/login'} />;

        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
});

const ProfileUrlMatch = (props) => {
    const match = useMatch('profile/:userId');

    return <ProfileContainer {...props} match={match} />;
};

export default connect(mapStateToProps, { getUserProfile })(ProfileUrlMatch);