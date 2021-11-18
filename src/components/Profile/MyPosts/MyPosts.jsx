import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div className={style.my_posts}>
            <h2>My posts</h2>

            <div className={style.new_post}>
                <div>
                    <textarea placeholder='New post'></textarea>
                </div>

                <div>
                    <button>Add post</button>
                </div>
            </div>

            <div className={style.posts}>
                <Post message='Hi! How are you?' likesCount='20' />
                <Post message="It's my first post" likesCount='15' />
            </div>
        </div>
    )
}

export default MyPosts;