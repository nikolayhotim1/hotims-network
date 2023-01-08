import profileReducer, { actions } from './profileReducer'

const state = {
	posts: [
		{ id: 1, message: "It's my first post.", likesCount: 15 },
		{ id: 2, message: 'Forza Juve!', likesCount: 30 }
	],
	profile: null,
	status: ''
}
test('Posts length should be incremented', () => {
	const action = actions.addPost('Nikolay23')
	const newState = profileReducer(state, action)
	expect(newState.posts.length).toBe(3)
})
test('New post message should be correct', () => {
	const action = actions.addPost('Nikolay23')
	const newState = profileReducer(state, action)
	expect(newState.posts[2].message).toBe('Nikolay23')
})
test('Posts length after deleting should be decremented', () => {
	const action = actions.deletePost(1)
	const newState = profileReducer(state, action)
	expect(newState.posts.length).toBe(1)
})
test("Posts length after deleting shouldn't be decremented if id is incorrect", () => {
	const action = actions.deletePost(1000)
	const newState = profileReducer(state, action)
	expect(newState.posts.length).toBe(2)
})
