import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReduser';

const Dialogs = (props) => {
    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(
        d => <DialogItem name={d.name} id={d.id} />
    );

    let messagesElements = state.messages.map(
        m => <Message message={m.message} />
    );

    let newMessageText = state.newMessageText;

    let sendMessage = () => {
        let action = sendMessageActionCreator();

        props.store.dispatch(action);
    }

    let onMessageChange = (e) => {
        let text = e.target.value;
        let action = updateNewMessageTextActionCreator(text);

        props.store.dispatch(action);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                {dialogsElements}
            </div>

            <div className={style.messages}>
                {messagesElements}
            </div>

            <div className={style.new_message}>
                <div>
                    <textarea
                        value={newMessageText}
                        onChange={onMessageChange}
                        placeholder='New message'
                    />
                </div>

                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;