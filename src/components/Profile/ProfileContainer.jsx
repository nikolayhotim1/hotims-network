import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { userProfileAPI } from '../../api/api';
import { setUserProfile } from '../../redux/profileReduser';
import Profile from './Profile';

const myId = 21659;

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : myId;

        userProfileAPI.getUserProfile(
            userId
        ).then(data => {
            this.props.setUserProfile(data);
        });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

const ProfileUrlMatch = (props) => {
    const match = useMatch('profile/:userId');

    return <ProfileContainer {...props} match={match} />;
};

export default connect(mapStateToProps, { setUserProfile })(ProfileUrlMatch);