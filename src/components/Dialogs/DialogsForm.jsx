import React from 'react';
import style from './Dialogs.module.css';
import { Field } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
    return (
        <form className={style.new_message} onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name='newMessageText'
                    placeholder='New message'
                    validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    );
};

export default DialogsForm;