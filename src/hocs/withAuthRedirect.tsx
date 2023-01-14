import { ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/reduxStore'

const mapStateToPropsForRedirect = (state: AppStateType) => ({ isAuth: state.auth.isAuth } as MapPropsType)
type MapPropsType = {
	isAuth: boolean
}
type DispatchPropsType = {}
export function withAuthRedirect<WCP extends object>(WrappedComponent: ComponentType<WCP>) {
	const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
		const { isAuth, ...restProps } = props
		return <WrappedComponent {...(restProps as WCP)} />
	}
	const ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
		mapStateToPropsForRedirect,
		{}
	)(RedirectComponent)
	return ConnectedAuthRedirectComponent
}
