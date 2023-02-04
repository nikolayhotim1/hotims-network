import { ChangeEvent, FC, useEffect, useState } from 'react'
import style from './ProfileStatus.module.css'
type PropsType = {
	status: string
	isOwner: boolean
	getUpdateStatus: (status: string) => void
}
const ProfileStatus: FC<PropsType> = props => {
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)
	useEffect(() => {
		setStatus(props.status)
	}, [props.status])
	const activateEditMode = () => {
		props.isOwner && setEditMode(true)
	}
	const deactivateEditMode = () => {
		setEditMode(false)
		props.getUpdateStatus(status)
	}
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}
	return (
		<div>
			{!editMode && (
				<div className={style.status} onClick={activateEditMode}>
					{props.isOwner ? (
						<i className={style.owner_status}>{props.status || 'Tell us about yourself...'}</i>
					) : (
						<i>{props.status || ''}</i>
					)}
				</div>
			)}
			{editMode && (
				<div>
					<input
						placeholder='Tell us about yourself...'
						onChange={onStatusChange}
						autoFocus={true}
						onBlur={deactivateEditMode}
						value={status}
					/>
				</div>
			)}
		</div>
	)
}
export default ProfileStatus
