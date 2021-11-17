import React from 'react';
import style from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_items}>
                <div className={`${style.dialog} ${style.active}`}>
                    Andrey
                </div>

                <div className={style.dialog}>
                    Denis
                </div>

                <div className={style.dialog}>
                    Katya
                </div>

                <div className={style.dialog}>
                    Mum
                </div>

                <div className={style.dialog}>
                    Dad
                </div>
            </div>

            <div className={style.messages}>
                <div className={style.message}>
                    Hi!
                </div>

                <div className={style.message}>
                    How are you?
                </div>

                <div className={style.message}>
                    Yo!
                </div>
            </div>
        </div>
    )
}

export default Dialogs;