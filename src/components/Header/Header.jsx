import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png'
                alt='Juventus logo' />

            <div className={style.login_block}>{props.isAuth
                ? props.login
                : <NavLink to={'/login'}>Login</NavLink>
            }</div>
        </header>
    );
};

export default Header;