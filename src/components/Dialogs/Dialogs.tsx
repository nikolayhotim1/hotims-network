import { FC } from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import DialogsForm, { NewMessageFormValuesType } from './DialogsForm'
import { InitialStateType } from '../../redux/dialogsReducer'

type PropsType = {
	dialogsPage: InitialStateType
	sendMessage: (newMessageText: string | null) => void
}
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
			<DialogsForm onSubmit={addNewMessage} />
		</div>
	)
}
export default Dialogs
