import style from './Users.module.css'
import { useSelector } from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import { getIsFetching } from '../../redux/usersSelectors'
import { FC, memo } from 'react'
import { Users } from './Users'
type UserPagePropsType = {
	pageTitle: string
}
export const UsersPage: FC<UserPagePropsType> = memo(({ pageTitle }) => {
	const isFetching = useSelector(getIsFetching)
	return (
		<>
			<h1 className={style.title}>{pageTitle}</h1>
			{isFetching ? <Preloader /> : null}
			<Users />
		</>
	)
})
