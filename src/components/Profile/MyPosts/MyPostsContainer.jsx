import { connect } from 'react-redux'
import { actions } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => {
			dispatch(actions.addPost(newPostText))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
