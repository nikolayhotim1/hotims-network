import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Dialogs.module.css';

const DialogItem = (props) => {
    let path = `/dialogs/${props.id}`;

    return (
        <div className={`${style.dialog} ${style.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={style.message}>
            {props.message}
        </div>
    )
}

const Dialogs = (props) => {

    let dialogs = [
        { id: 1, name: 'Andrey' },
        { id: 2, name: 'Denis' },
        { id: 3, name: 'Katya' },
        { id: 4, name: 'Mum' },
        { id: 5, name: 'Dad' }
    ];
    
    let messages = [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo!' },
        { id: 4, message: 'Yo!' },
        { id: 5, message: 'Yo!' }
    ];

    let dialogsElements = dialogs.map(
        d => <DialogItem name={d.name} id={d.id} />
    );

    let messagesElements = messages.map(
        m => <Message message={m.message} />
    );

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                {dialogsElements}
            </div>

            <div className={style.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;