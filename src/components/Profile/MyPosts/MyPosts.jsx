import React from 'react';
import { reduxForm } from 'redux-form';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import MyPostsForm from './MyPostsForm';

const MyPostsReduxForm = reduxForm({ form: 'post' })(MyPostsForm);

const MyPosts = (props) => {
    let postsElements = props.posts.map(
        p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />
    );


    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={style.my_posts}>
            <h2>My posts</h2>

            <MyPostsReduxForm onSubmit={onAddPost} />

            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;