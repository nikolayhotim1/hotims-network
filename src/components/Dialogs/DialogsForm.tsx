import style from './Dialogs.module.css'
import { createField, GetStringKeys, Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'

type PropsType = {}
export type NewMessageFormValuesType = {
	newMessageText: string | null
}
type NewMessageFormValuesTypeKeys = GetStringKeys<NewMessageFormValuesType>
const maxLength50 = maxLengthCreator(50)
const DialogsForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
	return (
		<form className={style.new_message} onSubmit={props.handleSubmit}>
			<div>
				{createField<NewMessageFormValuesTypeKeys>(Textarea, 'newMessageText', 'New message', [required, maxLength50])}
			</div>
			<div>
				<button type='submit'>Send message</button>
			</div>
		</form>
	)
}
export default reduxForm<NewMessageFormValuesType, PropsType>({ form: 'dialog' })(DialogsForm)
