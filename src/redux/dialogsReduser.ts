const SEND_MESSAGE = 'dialogsReduser/SEND-MESSAGE';

type DialogType = {
    id: number,
    name: string
};

type MessageType = {
    id: number,
    message: string
};

const initialState = {
    dialogs: [
        { id: 1, name: 'Andrey' },
        { id: 2, name: 'Denis' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Mum' },
        { id: 5, name: 'Dad' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo!' },
        { id: 4, message: 'Yo!' },
        { id: 5, message: 'Yo!' }
    ] as Array<MessageType>
};

type InitialStateType = typeof initialState;

const dialogsReduser = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            const newMessage = {
                id: 6,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [
                    ...state.messages,
                    newMessage
                ]
            };
        }
        default:
            return state;
    }
};

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string
};

export const sendMessageActionCreator = (newMessageText: string): SendMessageActionCreatorType => (
    { type: SEND_MESSAGE, newMessageText }
);

export default dialogsReduser;