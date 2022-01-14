import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(
        d => <DialogItem name={d.name} key={d.id} id={d.id} />
    );

    let messagesElements = state.messages.map(
        m => <Message message={m.message} key={m.id} />
    );

    let newMessageText = state.newMessageText;

    let onSendMessage = () => {
        props.sendMessage();
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    };

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
                    <button onClick={onSendMessage}>Send message</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;