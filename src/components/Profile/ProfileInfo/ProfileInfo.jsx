import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={style.main_image}>
                <img src='https://wallpaperaccess.com/full/2130425.jpg'
                    alt='Savanna' />
            </div>

            <div className={style.avatar_with_descriptions}>
                <img src={props.profile.photos.large}
                    alt='Zebra' />

                <div className={style.descriptions}>
                    <h1>Nikolay Hotim</h1>
                    <p>Date of birth: 23.12.1992</p>
                    <p>City of residence: Grodno, Belarus</p>
                    <p>Front-end developer (HTML5, CSS3, JavaScript, React)</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;