import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReduser';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let onSendMessage = () => {
        let action = sendMessageActionCreator();

        props.store.dispatch(action);
    }

    let onMessageChange = (text) => {
        let action = updateNewMessageTextActionCreator(text);

        props.store.dispatch(action);
    }

    return (
        <Dialogs
            dialogsPage={state}
            sendMessage={onSendMessage}
            updateNewMessageText={onMessageChange}
        />
    )
}

export default DialogsContainer;