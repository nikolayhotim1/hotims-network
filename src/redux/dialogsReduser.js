const SEND_MESSAGE = 'dialogsReduser/SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Andrey' },
        { id: 2, name: 'Denis' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Mum' },
        { id: 5, name: 'Dad' }
    ],

    messages: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo!' },
        { id: 4, message: 'Yo!' },
        { id: 5, message: 'Yo!' }
    ]
};

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
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

export const sendMessageActionCreator = (newMessageText) => (
    { type: SEND_MESSAGE, newMessageText }
);

export default dialogsReduser;