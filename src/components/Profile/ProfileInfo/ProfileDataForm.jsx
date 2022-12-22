import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import style from './ProfileInfo.module.css';
import style2 from '../../common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form className={style.info} onSubmit={handleSubmit}>
            <div>
                <h1>{createField(Input, 'fullName', 'Full Name', [])}</h1>
                <p><b>About me:</b> {createField(Textarea, 'aboutMe', 'About me', [])}</p>
                <p><b>Looking for a job:</b> {createField(Input, 'lookingForAJob', '', [], { type: 'checkbox' })}</p>
                <p><b>My skills:</b> {createField(Textarea, 'lookingForAJobDescription', 'My professional skills', [])}</p>
                {<div><button>Save</button></div>}
                {error && <div className={style2.formSummaryError}>{error}</div>}
            </div>
            <div className={style.contacts}>
                <h2>My Contacts:</h2>
                {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key}><b>{key}: {createField(Input, `contacts.${key}`, key, [])}</b></div>
                    );
                })}
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataFormReduxForm;