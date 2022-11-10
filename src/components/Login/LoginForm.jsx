import React from 'react';
import { Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Input}
                    name='email'
                    placeholder='Email'
                    validate={[required]}
                />
            </div>

            <div>
                <Field
                    component={Input}
                    name='password'
                    placeholder='Password'
                    validate={[required]}
                    type='password'
                />
            </div>

            <div>
                <Field
                    component={Input}
                    name='rememberMe'
                    type='checkbox'
                />Remember me
            </div>

            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export default LoginForm;