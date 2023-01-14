import Header, { MapPropsType, DispatchPropsType } from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'
import { Component } from 'react'

class HeaderContainer extends Component<MapPropsType & DispatchPropsType> {
	render() {
		return <Header {...this.props} />
	}
}
const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer)
