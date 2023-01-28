import { FC, useEffect, useState } from 'react'
import style from './ChatPage.module.css'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}
const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
	return (
		<div>
			<img className={style.message} src={message.photo} alt={message.userName} /> <b>{message.userName}</b>
			<br />
			{message.message}
			<hr />
		</div>
	)
}
const Messages: FC = () => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	useEffect(() => {
		ws.addEventListener('message', e => {
			const newMessages = JSON.parse(e.data)
			setMessages(prevMessages => [...prevMessages, ...newMessages])
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className={style.messages}>
			{messages.map((m, i) => (
				<Message message={m} key={i} />
			))}
		</div>
	)
}
const AddMessageForm: FC = () => {
	const [message, setMessage] = useState('')
	const sendMessage = () => {
		if (!message) {
			return
		}
		ws.send(message)
		setMessage('')
	}
	return (
		<div>
			<label>
				<textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
				<br />
				<button type='submit' onClick={sendMessage}>
					Send
				</button>
			</label>
		</div>
	)
}
const Chat: FC = () => {
	return (
		<div>
			<Messages />
			<AddMessageForm />
		</div>
	)
}
export const ChatPage: FC = () => {
	return <Chat />
}
