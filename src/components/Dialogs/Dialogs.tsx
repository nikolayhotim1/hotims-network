import { FC } from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { reduxForm } from 'redux-form'
import DialogsForm from './DialogsForm'
import { InitialStateType } from '../../redux/dialogsReducer'

type PropsType = {
	dialogsPage: InitialStateType
	sendMessage: (newMessageText: string | null) => void
}
export type NewMessageFormValuesType = {
	newMessageText: string | null
}
export type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>
const DialogsReduxForm = reduxForm<NewMessageFormValuesType>({ form: 'dialog' })(DialogsForm)
const Dialogs: FC<PropsType> = (props) => {
	const state = props.dialogsPage
	const dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id} />)
	const messagesElements = state.messages.map((m) => <Message message={m.message} key={m.id} />)
	const addNewMessage = (values: NewMessageFormValuesType) => {
		props.sendMessage(values.newMessageText)
	}
	return (
		<div className={style.dialogs}>
			<div>{dialogsElements}</div>
			<div className={style.messages}>{messagesElements}</div>
			<DialogsReduxForm onSubmit={addNewMessage} />
		</div>
	)
}
export default Dialogs
