import { ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppSateType } from '../redux/reduxStore'

type MapPropsType = {
	isAuth: boolean
}
type DispatchPropsType = {}
const mapStateToPropsForRedirect = (state: AppSateType) => ({ isAuth: state.auth.isAuth })
export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
	const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
		const { isAuth, ...restProps } = props
		if (!props.isAuth) return <Navigate to={'/login'} />
		return <WrappedComponent {...(restProps as WCP)} />
	}
	return connect<MapPropsType, DispatchPropsType, WCP, AppSateType>(mapStateToPropsForRedirect)(RedirectComponent)
}
