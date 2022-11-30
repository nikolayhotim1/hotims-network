import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/userPhoto.png';
import style from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, getUpdateStatus }) => {
    if (!profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={style.main_image}>
                <img
                    src='https://wallpaperaccess.com/full/2130425.jpg'
                    alt='Savanna'
                />
            </div>

            <div className={style.avatar_with_descriptions}>
                <img
                    src={profile.photos.large || userPhoto}
                    alt='Zebra'
                />

                <div className={style.descriptions}>
                    <h1>{profile.fullName}</h1>

                    <ProfileStatusWithHooks
                        status={status}
                        getUpdateStatus={getUpdateStatus}
                    />

                    <p>Date of birth: 23.12.1992</p>
                    <p>City of residence: Grodno, Belarus</p>
                    <p>About me: {profile.aboutMe}</p>

                    <p>Looking for a job: {profile.lookingForAJob
                        ? profile.lookingForAJobDescription
                        : 'not looking for'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;