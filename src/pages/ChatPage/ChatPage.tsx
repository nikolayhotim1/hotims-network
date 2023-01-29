import { FC, useEffect, useState } from 'react'
import style from './ChatPage.module.css'

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
const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	useEffect(() => {
		const messageHandler = (e: MessageEvent<any>): void => {
			const newMessages = JSON.parse(e.data)
			setMessages(prevMessages => [...prevMessages, ...newMessages])
		}
		wsChannel?.addEventListener('message', messageHandler)
		return () => {
			wsChannel?.removeEventListener('message', messageHandler)
		}
	}, [wsChannel])
	return (
		<div className={style.messages}>
			{messages.map((m, i) => (
				<Message message={m} key={i} />
			))}
		</div>
	)
}
const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [message, setMessage] = useState('')
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
	const sendMessage = () => {
		if (!message) return
		wsChannel?.send(message)
		setMessage('')
	}
	useEffect(() => {
		const openHandler = () => {
			setReadyStatus('ready')
		}
		wsChannel?.addEventListener('open', openHandler)
		return () => {
			wsChannel?.removeEventListener('open', openHandler)
		}
	}, [wsChannel])
	return (
		<div>
			<label>
				<textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
				<br />
				<button disabled={!wsChannel || readyStatus !== 'ready'} type='submit' onClick={sendMessage}>
					Send
				</button>
			</label>
		</div>
	)
}
const Chat: FC = () => {
	const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
	useEffect(() => {
		let ws: WebSocket
		const closeHandler = () => {
			setTimeout(createChannel, 3000)
		}
		const createChannel = () => {
			ws?.removeEventListener('close', closeHandler)
			ws?.close()
			ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
			ws.addEventListener('close', closeHandler)
			setWsChannel(ws)
		}
		createChannel()
		return () => {
			ws.removeEventListener('close', closeHandler)
			ws.close()
		}
	}, [])
	return (
		<div>
			<Messages wsChannel={wsChannel} />
			<AddMessageForm wsChannel={wsChannel} />
		</div>
	)
}
export const ChatPage: FC = () => {
	return <Chat />
}
