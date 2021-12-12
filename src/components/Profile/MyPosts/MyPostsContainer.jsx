import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReduser';
import StoreContext from '../../../StoreContext';
import MyPosts from './MyPosts';

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();

                let onAddPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                let onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text);

                    store.dispatch(action);
                }

                return (
                    <MyPosts
                        posts={state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                        addPost={onAddPost}
                        updateNewPostText={onPostChange}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;