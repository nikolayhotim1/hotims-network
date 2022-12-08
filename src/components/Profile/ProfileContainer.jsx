import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { getUserProfile, getUserStatus, getUpdateStatus } from '../../redux/profileReduser';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match ? this.props.match.params.userId : this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.match && this.props.match.params.userId !== prevProps.match.params.userId)
            || (!this.props.match && this.props.match !== prevProps.match)) this.refreshProfile();
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
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

const ProfileUrlMatch = (props) => {
    const match = useMatch('profile/:userId');
    return <AuthRedirectComponent {...props} match={match} />;
};

export default compose(connect(
    mapStateToProps,
    { getUserProfile, getUserStatus, getUpdateStatus }
))(ProfileUrlMatch);