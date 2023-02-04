import { DialogType, MessageType } from './../types/types'
import { InferActionsTypes } from './reduxStore'
const initialState = {
	dialogs: [
		{ id: 1, name: 'Andrey' },
		{ id: 2, name: 'Denis' },
		{ id: 3, name: 'Katya' }
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'Hi!' },
		{ id: 2, message: 'How are you?' },
		{ id: 3, message: 'Yo!' }
	] as Array<MessageType>
}
export type InitialStateType = typeof initialState
export const actions = {
	sendMessage: (newMessageText: string) =>
		({
			type: 'hotims-network/dialogsReduser/SEND-MESSAGE',
			newMessageText
		} as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>
const dialogsReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'hotims-network/dialogsReduser/SEND-MESSAGE': {
			return { ...state, messages: [...state.messages, { id: 4, message: action.newMessageText }] }
		}
		default:
			return state
	}
}
export default dialogsReduser
