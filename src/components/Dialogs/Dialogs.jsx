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
    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                <DialogItem name='Andrey' id='1' />
                <DialogItem name='Denis' id='2' />
                <DialogItem name='Katya' id='3' />
                <DialogItem name='Mum' id='4' />
                <DialogItem name='Dad' id='5' />
            </div>

            <div className={style.messages}>
                <Message message='Hi!' />
                <Message message='How are you?' />
                <Message message='Yo!' />
            </div>
        </div>
    )
}

export default Dialogs;