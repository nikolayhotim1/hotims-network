import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let posts = [
        { id: 1, message: 'Hi! How are you?', likesCount: 20 },
        { id: 2, message: 'It\'s my first post', likesCount: 15 },
        { id: 3, message: 'Forza Juve!', likesCount: 30},
        { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
    ];

    let postsElements = posts.map(
        p => <Post message={p.message} likesCount={p.likesCount} />
    );

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
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;