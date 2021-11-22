import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map(
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