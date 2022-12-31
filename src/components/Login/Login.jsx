import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoginForm from './LoginForm';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ login, isAuth, captchaURL }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    if (isAuth) {
        return <Navigate to='/profile' />;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);