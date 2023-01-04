import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
import hotimsNetwork from './../../assets/images/hotims-network.jpg';

const Header = (props) => {
    return (
        <header className={style.header}>
            <img
                src={hotimsNetwork}
                alt='Hotims Network'
            />
            <div className={style.login_block}>
                {props.isAuth ?
                    <div>
                        {props.login} <button onClick={props.logout}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;