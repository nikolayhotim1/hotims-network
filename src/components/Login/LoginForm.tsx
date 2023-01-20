import { FC, memo } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'

type PropsType = {
	captchaURL: string | null
}
export type LoginFormValuesType = {
	email: string | null
	password: string | null
	rememberMe: boolean
	captcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = memo(
	({ handleSubmit, error, captchaURL }) => {
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
)
export default reduxForm<LoginFormValuesType, PropsType>({ form: 'login' })(LoginForm)
