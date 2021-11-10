import React from 'react';
import style from './Post.module.css';

const Post = () => {
    return (
        <div className={style.item}>
            <img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
                alt="Cat" />

            <span>
                Post 1
            </span>

            <div>
                Like
            </div>
        </div>
    )
}

export default Post;