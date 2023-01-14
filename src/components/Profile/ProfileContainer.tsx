import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserStatus, getUserProfile, savePhoto, saveProfile, getUpdateStatus } from '../../redux/profileReducer'
import { compose } from 'redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'
import { ProfileType } from '../../types/types'
import { Component, ComponentType } from 'react'
import { withRouter } from '../../hocs/withRouter'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
	router: any
	profile: any
	getUserProfile: (userId: number) => void
	getUserStatus: (userId: number) => void
	getUpdateStatus: (status: string) => void
	savePhoto: (photoFile: File) => void
	saveProfile: (profile: ProfileType) => Promise<any>
}
type PropsType = MapPropsType & DispatchPropsType
type LocalStateType = { isShowMyProfile: boolean }
class ProfileContainer extends Component<PropsType, LocalStateType> {
	constructor(props: PropsType) {
		super(props)
		this.state = {
			isShowMyProfile: true
		}
	}
	componentDidMount() {
		const userIdFromPath = +this.props.router.params.userId
		const authorisedUserId = this.props.authorisedUserId
		if (userIdFromPath) {
			this.props.getUserProfile(userIdFromPath)
			this.props.getUserStatus(userIdFromPath)
		} else {
			if (this.props.isAuth && authorisedUserId) {
				this.props.getUserProfile(authorisedUserId)
				this.props.getUserStatus(authorisedUserId)
			}
		}
	}
	componentDidUpdate() {
		const userIdFromPath = +this.props.router.params.userId
		const authorisedUserId = this.props.authorisedUserId
		const isShowMyProfile = this.state.isShowMyProfile
		if (isShowMyProfile) {
			if (userIdFromPath === authorisedUserId) this.setState({ isShowMyProfile: false })
			if (!userIdFromPath && this.props.isAuth && authorisedUserId) {
				this.props.getUserProfile(authorisedUserId)
				this.props.getUserStatus(authorisedUserId)
				this.setState({ isShowMyProfile: false })
			}
		}
	}
	render() {
		if (!this.props.isAuth && !this.props.router.params.userId) return <Navigate to={'/login'} />
		const userIdFromPath = +this.props.router.params.userId
		const authorisedUserId = this.props.authorisedUserId
		let isOwner = false
		if (!userIdFromPath && this.props.isAuth) isOwner = true
		else if (userIdFromPath === authorisedUserId) isOwner = true
		return (
			<div>
				<Profile
					profile={this.props.profile}
					status={this.props.status}
					getUpdateStatus={this.props.getUpdateStatus}
					isOwner={isOwner}
					savePhoto={this.props.savePhoto}
					saveProfile={this.props.saveProfile}
				/>
			</div>
		)
	}
}
const mapStateToProps = (state: AppStateType) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorisedUserId: state.auth.id,
		isAuth: state.auth.isAuth
	}
}
const ProfileContainerCompose = compose<ComponentType>(
	withRouter,
	connect(mapStateToProps, { getUserProfile, getUserStatus, getUpdateStatus, savePhoto, saveProfile })
)(ProfileContainer)
export default ProfileContainerCompose
