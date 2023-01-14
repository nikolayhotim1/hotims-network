import style from './MyPosts.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { createField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls'
import { FC } from 'react'

type PropsType = {}
export type MyPostsFormValuesType = {
	newPostText: string
}
type MyPostsFormValuesTypeKeys = GetStringKeys<MyPostsFormValuesType>
const maxLength100 = maxLengthCreator(100)
const MyPostsForm: FC<InjectedFormProps<MyPostsFormValuesType, PropsType> & PropsType> = (props) => {
	return (
		<form className={style.new_post} onSubmit={props.handleSubmit}>
			<div>{createField<MyPostsFormValuesTypeKeys>(Textarea, 'newPostText', 'New post', [required, maxLength100])}</div>
			<div>
				<button type='submit'>Add post</button>
			</div>
		</form>
	)
}
export default reduxForm<MyPostsFormValuesType, PropsType>({ form: 'post' })(MyPostsForm)
