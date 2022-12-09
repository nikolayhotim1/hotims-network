import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/computer-user-icon.png';
import style from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ isOwner, profile, status, getUpdateStatus, savePhoto }) => {
    if (!profile) return <Preloader />;

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) savePhoto(e.target.files[0]);
    };

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

            <div>
                {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
            </div>
        </div>
    );
};

export default ProfileInfo;