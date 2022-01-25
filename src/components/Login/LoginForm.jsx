import React from 'react';
import { Field } from 'redux-form';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'} />
            </div>

            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'} />
            </div>

            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} />Remember me
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default LoginForm;