import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { setUserProfile } from '../../redux/profileReduser';
import Profile from './Profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : 2;

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
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