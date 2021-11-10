import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import style from './Profile.module.css';

const Profile = () => {
    return (
        <div className={style.profile}>
            <div className={style.background_image}>
                <img src='https://wallpaperaccess.com/full/2130425.jpg'
                    alt='Savanna' />
            </div>

            <div className={style.avatar_with_descriptions}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabBDvUo74Unf7YNUQJHivkHeRvymbm2CcWQ&usqp=CAU'
                    alt='Zebra' />

                <div className={style.descriptions}>
                    <h1>Nikolay Hotim</h1>
                    <p>Date of birth: 23.12.1992</p>
                    <p>City of residence: Grodno, Belarus</p>
                    <p>Front-end developer (HTML5, CSS3, JavaScript, React)</p>
                </div>
            </div>

            <MyPosts />
        </div>
    )
}

export default Profile;