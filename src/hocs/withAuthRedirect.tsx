import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/reduxStore'
import { ComponentType, FC } from 'react'

const mapStateToPropsForRedirect = (state: AppStateType) => {
	return {
		isAuth: state.auth.isAuth
	}
}
type MapPropsType = { isAuth: boolean }
type DispatchPropsType = {}
export function withAuthRedirect<WCP extends object>(WrappedComponent: ComponentType<WCP>) {
	const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
		const { isAuth, ...restProps } = props
		if (!isAuth) return <Navigate to={'/login'} />
		return <WrappedComponent {...(restProps as WCP)} />
	}
	return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
}
