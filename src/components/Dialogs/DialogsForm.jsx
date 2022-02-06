import React from 'react';
import style from './Dialogs.module.css';
import { Field } from 'redux-form';

const DialogsForm = (props) => {
    return (
        <form
            className={style.new_message}
            onSubmit={props.handleSubmit}
        >
            <div>
                <Field
                    component='textarea'
                    name='newMessageText'
                    placeholder='New message'
                />
            </div>

            <div>
                <button>Send message</button>
            </div>
        </form>
    );
};

export default DialogsForm;