import React from 'react';

const Profile = () => {
    return (
        <div className='profile'>
            <div className='background-image'>
                <img src='https://wallpaperaccess.com/full/2130425.jpg'
                    alt='Savanna' />
            </div>

            <div className='avatar-with-descriptions'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabBDvUo74Unf7YNUQJHivkHeRvymbm2CcWQ&usqp=CAU'
                    alt='Zebra' />

                <div className='descriptions'>
                    <h1>Nikolay Hotim</h1>
                    <p>Date of birth: 23.12.1992</p>
                    <p>City of residence: Grodno, Belarus</p>
                    <p>Front-end developer (HTML5, CSS3, JavaScript, React)</p>
                </div>
            </div>

            <div className='my-posts'>
                <h2>My posts</h2>

                <div className='new-post'>
                    New post
                </div>

                <div>
                    <div>
                        Post 1
                    </div>

                    <div>
                        Post 2
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;