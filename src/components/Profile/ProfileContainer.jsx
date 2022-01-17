import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { compose } from 'redux';
// import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { getUserProfile } from '../../redux/profileReduser';
import Profile from './Profile';

const myId = 21659;

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : myId;
        this.props.getUserProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

// const AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

const ProfileUrlMatch = (props) => {
    const match = useMatch('profile/:userId');
    // return <AuthRedirectComponent {...props} match={match} />;
    return <ProfileContainer {...props} match={match} />;
};

export default compose(
    connect(mapStateToProps, { getUserProfile })
)(ProfileUrlMatch);