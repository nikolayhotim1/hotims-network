import { FC } from 'react'
import { InjectedFormProps } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'
import { LoginFormValuesType, LoginFormValuesTypeKeys } from './Login'

export type LoginFormOwnProps = {
	captchaURL: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
	handleSubmit,
	error,
	captchaURL
}) => {
	return (
		<form onSubmit={handleSubmit}>
			{createField<LoginFormValuesTypeKeys>(Input, 'email', 'Email', [required])}
			{createField<LoginFormValuesTypeKeys>(Input, 'password', 'Password', [required], { type: 'password' })}
			{createField<LoginFormValuesTypeKeys>(Input, 'rememberMe', null, [], { type: 'checkbox' }, 'Remember me')}
			{captchaURL && (
				<>
					<img src={captchaURL} alt='captcha-url' />
					{createField<LoginFormValuesTypeKeys>(Input, 'captcha', 'Enter symbols from image', [required])}
				</>
			)}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<button type='submit'>Login</button>
			</div>
		</form>
	)
}
export default LoginForm
