import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './../Dialogs.module.css';

const DialogItem = (props) => {
    const path = `/dialogs/${props.id}`;
    return (
        <div className={style.dialog}>
            <NavLink className={dialog => dialog.isActive ? style.active : style.a} to={path}>{props.name}</NavLink>
        </div>
    );
};
export default DialogItem;