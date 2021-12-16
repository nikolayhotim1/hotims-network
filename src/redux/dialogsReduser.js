const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

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
    ],

    newMessageText: 'Guten Tag!'
};

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 6,
                message: state.newMessageText
            };

            let stateCopy = { ...state };
            stateCopy.messages = [...state.messages];

            stateCopy.messages.push(newMessage);
            stateCopy.newMessageText = '';

            return stateCopy;
        }

        case UPDATE_NEW_MESSAGE_TEXT: {
            let stateCopy = { ...state };

            stateCopy.newMessageText = action.newText;

            return stateCopy;
        }

        default:
            return state;
    }
};

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
});

export default dialogsReduser;