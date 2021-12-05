import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map(
        p => <Post message={p.message} likesCount={p.likesCount} />
    );

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let action = updateNewPostTextActionCreator(text);

        props.dispatch(action);
    }

    return (
        <div className={style.my_posts}>
            <h2>My posts</h2>

            <div className={style.new_post}>
                <div>
                    <textarea
                        onChange={onPostChange}
                        ref={newPostElement}
                        placeholder='New post'
                        value={props.newPostText}
                    />
                </div>

                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>

            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;