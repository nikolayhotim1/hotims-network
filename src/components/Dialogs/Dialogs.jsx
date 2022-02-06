import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm } from 'redux-form';
import DialogsForm from './DialogsForm';

const DialogsReduxForm = reduxForm({ form: 'dialog' })(DialogsForm);

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(
        d => <DialogItem name={d.name} key={d.id} id={d.id} />
    );

    let messagesElements = state.messages.map(
        m => <Message message={m.message} key={m.id} />
    );

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
    };

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                {dialogsElements}
            </div>

            <div className={style.messages}>
                {messagesElements}
            </div>

            <DialogsReduxForm onSubmit={addNewMessage} />
        </div>
    );
};

export default Dialogs;