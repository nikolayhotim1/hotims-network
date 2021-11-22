import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    return (
        <div className={style.item}>
            <div>
                {props.message}
            </div>
            
            <img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
                alt="Cat" />

            <span>
                Likes: {props.likesCount}
            </span>
        </div>
    )
}

export default Post;