import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div className={style.my_posts}>
            <h2>My posts</h2>

            <div className={style.new_post}>
                <textarea placeholder='New post'></textarea>
                <button>Add post</button>
            </div>

            <div className={style.posts}>
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default MyPosts;