import { connect } from 'react-redux'
import { actions } from '../../../redux/profileReducer'
import { AppStateType } from '../../../redux/reduxStore'
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts'
const mapStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts
	}
}
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPost })(MyPosts)
