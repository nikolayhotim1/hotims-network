import style from './MyPosts.module.css'
import Post from './Post/Post'
import { FC } from 'react'
import { PostType } from '../../../types/types'
import MyPostsForm, { MyPostsFormValuesType } from './MyPostsForm'
export type MapPropsType = {
	posts: Array<PostType>
}
export type DispatchPropsType = {
	addPost: (newPostText: string) => void
}
const MyPosts: FC<MapPropsType & DispatchPropsType> = props => {
	const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)
	const onAddPost = (values: MyPostsFormValuesType) => {
		props.addPost(values.newPostText)
	}
	return (
		<div className={style.my_posts}>
			<h2>My Posts</h2>
			<MyPostsForm onSubmit={onAddPost} />
			<div className={style.posts}>{postsElements}</div>
		</div>
	)
}
export default MyPosts
