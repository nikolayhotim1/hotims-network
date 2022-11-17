import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { getUserProfile, getUserStatus, getUpdateStatus } from '../../redux/profileReduser';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                getUpdateStatus={this.props.getUpdateStatus}
            />
        )
    }
}

const AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

const ProfileUrlMatch = (props) => {
    const match = useMatch('profile/:userId');
    return <AuthRedirectComponent {...props} match={match} />;
    // return <ProfileContainer {...props} match={match} />;
};

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, getUpdateStatus })
)(ProfileUrlMatch);