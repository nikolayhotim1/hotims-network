import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import LoginForm, { LoginFormOwnProps } from './LoginForm';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { AppSateType } from '../../redux/reduxStore';
import { FC } from 'react';

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);
type MapStatePropsType = {
    captchaURL: string | null,
    isAuth: boolean
};
type MapDispatchPropsType = {
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
};
export type LoginFormValuesType = {
    email: string | null,
    password: string | null,
    rememberMe: boolean,
    captcha: string | null
};
const Login: FC<MapStatePropsType & MapDispatchPropsType> = ({ login, isAuth, captchaURL }) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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
const mapStateToProps = (state: AppSateType): MapStatePropsType => ({
    captchaURL: state.auth.captchaURL,
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { login })(Login);