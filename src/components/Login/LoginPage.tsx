import { useDispatch, useSelector } from 'react-redux'
import LoginForm, { LoginFormValuesType } from './LoginForm'
import { login } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'
import { FC, memo } from 'react'
export const LoginPage: FC = memo(() => {
	const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const dispatch = useDispatch()
	const onSubmit = (formData: LoginFormValuesType) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}
	if (isAuth) return <Navigate to='/profile' />
	return (
		<div>
			<h1>Login</h1>
			<LoginForm onSubmit={onSubmit} captchaURL={captchaURL} />
		</div>
	)
})
