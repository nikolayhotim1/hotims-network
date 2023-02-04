import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { FC } from 'react'
import { ProfileType } from '../../types/types'
type PropsType = {
	isOwner: boolean
	profile: ProfileType | null
	status: string
	getUpdateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}
const Profile: FC<PropsType> = props => {
	return (
		<div>
			<ProfileInfo
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				getUpdateStatus={props.getUpdateStatus}
				savePhoto={props.savePhoto}
				saveProfile={props.saveProfile}
			/>
			<MyPostsContainer />
		</div>
	)
}
export default Profile
