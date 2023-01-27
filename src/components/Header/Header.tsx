import { Avatar, Button, Col, Layout, Menu, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserId, selectCurrentUserLogin, selectIsAuth } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Header: FC = () => {
	const isAuth = useSelector(selectIsAuth)
	const login = useSelector(selectCurrentUserLogin)
	const id = useSelector(selectCurrentUserId)
	const userPhoto = `https://social-network.samuraijs.com/activecontent/images/users/${id}/user-small.jpg`
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const logoutCallback = () => {
		dispatch(logout())
	}
	const { Header } = Layout
	return (
		<Header className='header'>
			<Row>
				<Col span={18}>
					<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
						<Menu.Item key='1'>
							<NavLink to='/users'>Find Developers</NavLink>
						</Menu.Item>
					</Menu>
				</Col>
				{isAuth ? (
					<>
						{' '}
						<Col span={1}>
							<Avatar
								src={userPhoto}
								alt={login || ''}
								icon={<UserOutlined />}
								onClick={() => navigate('/profile')}
							/>
						</Col>
						<Col span={3} style={{ color: 'white' }}>
							{login || ''}
						</Col>
						<Col span={2}>
							<Button onClick={logoutCallback}>Log out</Button>
						</Col>
					</>
				) : (
					<Col span={6}>
						<Button>
							<NavLink to={'/login'}>Login</NavLink>
						</Button>
					</Col>
				)}
			</Row>
		</Header>
	)
}
