import React from 'react';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import style from '../common/FormsControls/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField(Input, 'email', 'Email', [required])}
            {createField(Input, 'password', 'Password', [required], { type: 'password' })}
            {createField(Input, 'rememberMe', null, [], { type: 'checkbox' }, 'Remember me')}

            {captchaURL &&
                <div>
                    <img src={captchaURL} alt='captcha-url' />
                    {createField(Input, 'captcha', 'Enter symbols from image', [required])}
                </div>
            }

            {error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }

            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default LoginForm;