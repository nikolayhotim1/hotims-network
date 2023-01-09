import style from './Dialogs.module.css'
import { createField, Textarea } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { NewMessageFormValuesType, NewMessageFormValuesTypeKeys } from './Dialogs'
import { FC } from 'react'
import { InjectedFormProps } from 'redux-form'

const maxLength50 = maxLengthCreator(50)
type PropsType = {}
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
export default DialogsForm
