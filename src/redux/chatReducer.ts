import { BaseThunkType, InferActionsTypes } from './reduxStore'
import { Dispatch } from 'redux'
import { FormAction } from 'redux-form/lib/actions'
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chatAPI'
import { v1 } from 'uuid'
type ChatMessageType = ChatMessageAPIType & { id: string }
const initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'hotims-network/chatReduser/MESSAGES_RECEVIED':
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))].filter(
					(m, index, array) => index >= array.length - 100
				)
			}
		case 'hotims-network/chatReduser/STATUS_CHANGED':
			return {
				...state,
				status: action.payload.status
			}
		default:
			return state
	}
}
export const actions = {
	messagesReceived: (messages: ChatMessageAPIType[]) =>
		({
			type: 'hotims-network/chatReduser/MESSAGES_RECEVIED',
			payload: { messages }
		} as const),
	statusChanged: (status: StatusType) =>
		({
			type: 'hotims-network/chatReduser/STATUS_CHANGED',
			payload: { status }
		} as const)
}
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = messages => {
			dispatch(actions.messagesReceived(messages))
		}
	}
	return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = status => {
			dispatch(actions.statusChanged(status))
		}
	}
	return _statusChangedHandler
}
type ThunkType = BaseThunkType<ActionsType | FormAction>
export const startMessagesListening = (): ThunkType => async dispatch => {
	chatAPI.start()
	chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async dispatch => {
	chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
	chatAPI.stop()
}
export const sendMessage =
	(message: string): ThunkType =>
	async dispatch => {
		chatAPI.sendMessage(message)
	}
export default chatReducer
