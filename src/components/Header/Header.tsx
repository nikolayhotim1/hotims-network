import { NavLink } from 'react-router-dom'
import style from './Header.module.css'
import hotimsNetwork from './../../assets/images/hotims-network.jpg'
import { FC } from 'react'

export type MapPropsType = {
	isAuth: boolean
	login: string | null
}
export type DispatchPropsType = {
	logout: () => void
}
const Header: FC<MapPropsType & DispatchPropsType> = (props) => {
	return (
		<header className={style.header}>
			<img src={hotimsNetwork} alt='Hotims Network' />
			<div className={style.login_block}>
				{props.isAuth ? (
					<div>
						{props.login}{' '}
						<button type='submit' onClick={props.logout}>
							Logout
						</button>
					</div>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div>
		</header>
	)
}
export default Header
