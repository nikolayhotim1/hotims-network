import profileReducer, { addPostActionCreator, deletePost } from './profileReducer';

const state = {
    posts: [
        { id: 1, message: 'Hi! How are you?', likesCount: 20 },
        { id: 2, message: 'It\'s my first post', likesCount: 15 },
        { id: 3, message: 'Forza Juve!', likesCount: 30 },
        { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
    ]
};
test('Posts length should be incremented', () => {
    const action = addPostActionCreator('Nikolay23');
    const newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});
test('New post message should be correct', () => {
    const action = addPostActionCreator('Nikolay23');
    const newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('Nikolay23');
});
test('Posts length after deleting should be decremented', () => {
    const action = deletePost(1);
    const newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});
test('Posts length after deleting shouldn\'t be decremented if id is incorrect', () => {
    const action = deletePost(1000);
    const newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});