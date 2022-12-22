import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/computer-user-icon.png';
import style from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ isOwner, profile, status, getUpdateStatus, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        setEditMode(true);
    };
    if (!profile) {
        return <Preloader />;
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };
    return (
        <div>
            <div className={style.main_image}>
                <img src='https://wallpaperaccess.com/full/2130425.jpg' alt='Savanna' />
            </div>
            <div className={style.profile_wrapper}>
                <div className={style.avatar}>
                    <img src={profile.photos.large || userPhoto} alt='profile-avatar' />
                    <div>{isOwner && <input type='file' onChange={onMainPhotoSelected} />}</div>
                </div>
                {editMode ?
                    <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        status={status}
                        getUpdateStatus={getUpdateStatus}
                        onSubmit={onSubmit}
                    /> :
                    <ProfileData
                        profile={profile}
                        status={status}
                        getUpdateStatus={getUpdateStatus}
                        isOwner={isOwner}
                        activateEditMode={activateEditMode}
                    />
                }
            </div>
        </div>
    );
};

const ProfileData = ({ profile, status, getUpdateStatus, isOwner, activateEditMode }) => {
    return (
        <div className={style.info}>
            <div>
                <h1>{profile.fullName}</h1>
                <ProfileStatusWithHooks isOwner={isOwner} status={status} getUpdateStatus={getUpdateStatus} />
                <p><b>About me:</b> {profile.aboutMe}</p>
                <p><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</p>
                {profile.lookingForAJob && <p><b>My skills:</b> {profile.lookingForAJobDescription}</p>}
                {isOwner && <div><button onClick={activateEditMode}>Edit</button></div>}
            </div>
            <div className={style.contacts}>
                <h2>My Contacts:</h2>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <p><b>{contactTitle}:</b> {contactValue}</p>
    );
};

export default ProfileInfo;