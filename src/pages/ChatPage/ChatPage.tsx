import { FC, memo, UIEvent, useEffect, useRef, useState } from 'react'
import { ChatMessageAPIType } from '../../api/chatAPI'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chatReducer'
import { AppStateType } from '../../redux/reduxStore'
import style from './ChatPage.module.css'
export const ChatPage: FC = () => {
	return <Chat />
}
const Chat: FC = () => {
	const dispatch = useDispatch()
	const status = useSelector((state: AppStateType) => state.chat.status)
	useEffect(() => {
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, [dispatch])
	return (
		<div>
			{status === 'error' && <div>Some error occured. Please refresh the page</div>}
			<>
				<Messages />
				<AddMessageForm />
			</>
		</div>
	)
}
const Messages: FC = () => {
	const messages = useSelector((state: AppStateType) => state.chat.messages)
	const messagesAnchorRef = useRef<HTMLDivElement>(null)
	const [isAutoScroll, setIsAutoScroll] = useState(true)
	const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
		const element = e.currentTarget
		if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
			!isAutoScroll && setIsAutoScroll(true)
		} else {
			isAutoScroll && setIsAutoScroll(false)
		}
	}
	useEffect(() => {
		if (isAutoScroll) {
			setTimeout(() => {
				messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
			}, 500)
		}
	}, [isAutoScroll, messages])
	useEffect(() => {
		messagesAnchorRef.current?.scrollIntoView(true)
	}, [messages])
	return (
		<div className={style.messages} onScroll={scrollHandler}>
			{messages.map((m, index) => (
				<Message key={m.id} message={m} />
			))}
			<div ref={messagesAnchorRef}></div>
		</div>
	)
}
const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {
	return (
		<div>
			<img src={message.photo} alt={message.userName} className={style.message} /> <b>{message.userName}</b>
			<br />
			{message.message}
			<hr />
		</div>
	)
})
const AddMessageForm: FC = () => {
	const [message, setMessage] = useState('')
	const dispatch = useDispatch()
	const status = useSelector((state: AppStateType) => state.chat.status)
	const sendMessageHandler = () => {
		if (!message) return
		dispatch(sendMessage(message))
		setMessage('')
	}
	return (
		<label>
			<textarea placeholder='Message' onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
			<br />
			<button type='submit' disabled={status !== 'ready'} onClick={sendMessageHandler}>
				Send
			</button>
		</label>
	)
}
