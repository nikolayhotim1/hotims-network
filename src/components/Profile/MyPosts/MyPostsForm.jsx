import React from 'react';
import style from './MyPosts.module.css';
import { Field } from 'redux-form';

const MyPostsForm = (props) => {
    return (
        <form
            className={style.new_post}
            onSubmit={props.handleSubmit}
        >
            <div>
                <Field
                    component='textarea'
                    name='newPostText'
                    placeholder='New post'
                />
            </div>

            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

export default MyPostsForm;