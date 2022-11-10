import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoginForm from './LoginForm';
import { login } from '../../redux/authReduser';

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default connect(null, { login })(Login);