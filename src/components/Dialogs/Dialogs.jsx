import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(
        d => <DialogItem name={d.name} id={d.id} />
    );

    let messagesElements = props.dialogsPage.messages.map(
        m => <Message message={m.message} />
    );

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.addMessage();
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
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
                        onChange={onMessageChange}
                        ref={newMessageElement}
                        placeholder='New message'
                        value={props.dialogsPage.newMessageText}
                    />
                </div>

                <div>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;