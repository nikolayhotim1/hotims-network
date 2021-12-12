import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReduser';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState().dialogsPage;

                let onSendMessage = () => {
                    let action = sendMessageActionCreator();

                    store.dispatch(action);
                }

                let onMessageChange = (text) => {
                    let action = updateNewMessageTextActionCreator(text);

                    store.dispatch(action);
                }

                return (
                    <Dialogs
                        dialogsPage={state}
                        sendMessage={onSendMessage}
                        updateNewMessageText={onMessageChange}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;