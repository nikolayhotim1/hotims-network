import style from './Users.module.css'
import userPhoto from '../../assets/images/computer-user-icon.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
	user: UserType
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}
const User: FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
	return (
		<div className={style.user}>
			<span>
				<div>
					<NavLink to={`/profile/${user.id}`}>
						<img
							src={user.photos.small !== null ? user.photos.small : userPhoto}
							alt='My super avatar'
							className={style.userPhoto}
						/>
					</NavLink>
				</div>
				<div>
					{user.followed ? (
						<button
							type='submit'
							disabled={followingInProgress.some((id) => id === user.id)}
							onClick={() => unfollow(user.id)}
						>
							Unfollow
						</button>
					) : (
						<button
							type='submit'
							disabled={followingInProgress.some((id) => id === user.id)}
							onClick={() => follow(user.id)}
						>
							Follow
						</button>
					)}
				</div>
			</span>
			<span>
				<span>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</span>
				<span>
					<div>{'user.location.city'}</div>
					<div>{'user.location.country'}</div>
				</span>
			</span>
		</div>
	)
}

export default User