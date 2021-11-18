import React from 'react';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div className={style.profile_wrapper}>
            <ProfileInfo />
            <MyPosts />
        </div>
    )
}

export default Profile;