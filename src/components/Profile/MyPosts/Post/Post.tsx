import style from './Post.module.css'
import postImage from '../../../../assets/images/the-codefather-2.png'
import { FC } from 'react'

type PropsType = {
	message: string
	likesCount: number
}
const Post: FC<PropsType> = (props) => {
	return (
		<div className={style.item}>
			<div>{props.message}</div>
			<img src={postImage} alt='Post Cover' />
			<span>Likes: {props.likesCount}</span>
		</div>
	)
}
export default Post
