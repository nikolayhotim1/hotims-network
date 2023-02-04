import { ChangeEvent, FC, useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../assets/images/computer-user-icon.png'
import mainImage from '../../../assets/images/the-codefather.png'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'
type ProfileInfoPropsType = {
	isOwner: boolean
	profile: ProfileType | null
	status: string
	getUpdateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: FC<ProfileInfoPropsType> = ({ isOwner, profile, status, getUpdateStatus, savePhoto, saveProfile }) => {
	const [editMode, setEditMode] = useState(false)
	const activateEditMode = () => {
		setEditMode(true)
	}
	if (!profile) return <Preloader />
	const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) savePhoto(e.target.files[0])
	}
	const onSubmit = (formData: ProfileType) => {
		saveProfile(formData).then(() => {
			setEditMode(false)
		})
	}
	return (
		<div>
			<div className={style.main_image}>
				<img src={mainImage} alt='Main cover' />
			</div>
			<div className={style.profile_wrapper}>
				<div className={style.avatar}>
					<img src={profile.photos.large || userPhoto} alt='Profile avatar' />
					<div>{isOwner && <input type='file' onChange={onMainPhotoSelected} placeholder='My photo' />}</div>
				</div>
				{editMode ? (
					<ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
				) : (
					<ProfileData
						isOwner={isOwner}
						profile={profile}
						status={status}
						getUpdateStatus={getUpdateStatus}
						activateEditMode={activateEditMode}
					/>
				)}
			</div>
		</div>
	)
}
type ProfileDataPropsType = {
	isOwner: boolean
	profile: ProfileType
	status: string
	getUpdateStatus: (status: string) => void
	activateEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = ({ isOwner, profile, status, getUpdateStatus, activateEditMode }) => {
	return (
		<div className={style.info}>
			<div>
				<h1>{profile.fullName}</h1>
				<ProfileStatus isOwner={isOwner} status={status} getUpdateStatus={getUpdateStatus} />
				<div className={style.item}>
					<b>About me:</b> {profile.aboutMe}
				</div>
				<div className={style.item}>
					<b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
				</div>
				{profile.lookingForAJob && (
					<div className={style.item}>
						<b>My skills:</b> {profile.lookingForAJobDescription}
					</div>
				)}
				{isOwner && (
					<div>
						<button type='submit' onClick={activateEditMode}>
							Edit
						</button>
					</div>
				)}
			</div>
			<div className={style.contacts}>
				<h2>My Contacts:</h2>
				{Object.keys(profile.contacts).map(key => {
					return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
				})}
			</div>
		</div>
	)
}
type ContactPropsType = {
	contactTitle: string
	contactValue: string
}
const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
	return (
		<div className={style.item}>
			<b>{contactTitle}:</b> {contactValue}
		</div>
	)
}
export default ProfileInfo
