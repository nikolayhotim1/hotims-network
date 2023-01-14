import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import style from './Navbar.module.css'

const Navbar: FC = () => {
	return (
		<nav className={style.navbar}>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/profile'>
					Profile
				</NavLink>
			</div>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/dialogs'>
					Messages
				</NavLink>
			</div>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/users'>
					Users
				</NavLink>
			</div>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/news'>
					News
				</NavLink>
			</div>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/music'>
					Music
				</NavLink>
			</div>
			<div>
				<NavLink className={(navItem) => (navItem.isActive ? style.active : style.a)} to='/settings'>
					Settings
				</NavLink>
			</div>
		</nav>
	)
}
export default Navbar
