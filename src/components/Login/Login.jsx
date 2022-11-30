import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoginForm from './LoginForm';
import { login } from '../../redux/authReduser';
import { Navigate } from 'react-router-dom';

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ login, isAuth }) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe);
    };

    if (isAuth) {
        return <Navigate to='/profile' />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);