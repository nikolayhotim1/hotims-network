import React from 'react'
import style from './MyPosts.module.css'
import { Field } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'

const maxLength10 = maxLengthCreator(10)
const MyPostsForm = (props) => {
	return (
		<form className={style.new_post} onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea} name='newPostText' placeholder='New post' validate={[required, maxLength10]} />
			</div>
			<div>
				<button type='submit'>Add post</button>
			</div>
		</form>
	)
}
export default MyPostsForm
