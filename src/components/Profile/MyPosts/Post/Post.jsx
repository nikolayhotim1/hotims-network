import React from 'react'
import style from './Post.module.css'
import postImage from '../../../../assets/images/the-codefather-2.png'

const Post = (props) => {
	return (
		<div className={style.item}>
			<div>{props.message}</div>
			<img src={postImage} alt='Post Cover' />
			<span>Likes: {props.likesCount}</span>
		</div>
	)
}

export default Post
