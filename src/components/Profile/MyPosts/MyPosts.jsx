import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let postsData = [
        { id: 1, message: 'Hi! How are you?', likesCount: 20 },
        { id: 2, message: 'It\'s my first post', likesCount: 15 }
    ];

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
                <Post message={postsData[0].message} likesCount={postsData[0].likesCount} />
                <Post message={postsData[1].message} likesCount={postsData[1].likesCount} />
            </div>
        </div>
    )
}

export default MyPosts;