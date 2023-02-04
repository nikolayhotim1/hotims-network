import { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
export function withRouter(Component: FC) {
	function ComponentWithRouterProp(props: any) {
		const location = useLocation()
		const navigate = useNavigate()
		const params = useParams()
		return <Component {...props} router={{ location, navigate, params }} />
	}
	return ComponentWithRouterProp
}
