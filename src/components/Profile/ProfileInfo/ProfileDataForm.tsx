import { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, GetStringKeys, Input, Textarea } from '../../common/FormsControls/FormsControls'
import style from './ProfileInfo.module.css'
import style2 from '../../common/FormsControls/FormsControls.module.css'
import { ProfileType } from '../../../types/types'
type PropsType = {
	profile: ProfileType
}
type ProfileDataFormValuesTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
	return (
		<form className={style.info} onSubmit={handleSubmit}>
			<div>
				<h1>{createField(Input, 'fullName', 'Full Name', [])}</h1>
				<div>
					<b>About me:</b> {createField<ProfileDataFormValuesTypeKeys>(Textarea, 'aboutMe', 'About me', [])}
				</div>
				<div>
					<b>Looking for a job:</b>{' '}
					{createField<ProfileDataFormValuesTypeKeys>(Input, 'lookingForAJob', '', [], { type: 'checkbox' })}
				</div>
				<div>
					<b>My skills:</b>{' '}
					{createField<ProfileDataFormValuesTypeKeys>(
						Textarea,
						'lookingForAJobDescription',
						'My professional skills',
						[]
					)}
				</div>
				{
					<div>
						<button type='submit'>Save</button>
					</div>
				}
				{error && <div className={style2.formSummaryError}>{error}</div>}
			</div>
			<div className={style.contacts}>
				<h2>My Contacts:</h2>
				{Object.keys(profile.contacts).map(key => {
					return (
						<div key={key}>
							<b>
								{key}: {createField(Input, `contacts.${key}`, key, [])}
							</b>
						</div>
					)
				})}
			</div>
		</form>
	)
}
export default reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfileDataForm)
