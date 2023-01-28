import { Component, FC, lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import './App.css'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/reduxStore'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'antd/dist/reset.css'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import { Header } from './components/Header/Header'
import { NavLink } from 'react-router-dom'
import ProfileContainer from './components/Profile/ProfileContainer'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout
const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage').then(module => ({ default: module.ChatPage })))
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersPage = lazy(() => import('./components/Users/UsersPage').then(module => ({ default: module.UsersPage })))
const LoginPage = lazy(() => import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })))
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
	initializeApp: () => void
}
class App extends Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		console.log(`Some error occured: ${e.reason}, ${e.promise}`)
	}
	componentDidMount() {
		this.props.initializeApp()
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}
	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}
	render() {
		if (!this.props.initialized) return <Preloader />
		return (
			<Layout>
				<Header />
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>
							<NavLink to='/profile'>My Page</NavLink>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<NavLink to='/chat'>Chat</NavLink>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<NavLink to='/dialogs'>Messages</NavLink>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<NavLink to='/users'>Developers</NavLink>
						</Breadcrumb.Item>
					</Breadcrumb>
					<Layout className='site-layout-background' style={{ padding: '24px 0' }}>
						<Sider className='site-layout-background' width={200}>
							<Menu mode='inline' style={{ height: '100%' }}>
								<SubMenu key='sub1' icon={<UserOutlined />} title='Profile'>
									<Menu.Item key='1'>
										<NavLink to='/profile'>My Page</NavLink>
									</Menu.Item>
								</SubMenu>
								<SubMenu key='sub2' icon={<NotificationOutlined />} title='Dialogs'>
									<Menu.Item key='2'>
										<NavLink to='/chat'>Chat</NavLink>
									</Menu.Item>
									<Menu.Item key='3'>
										<NavLink to='/dialogs'>Messages</NavLink>
									</Menu.Item>
								</SubMenu>
								<SubMenu key='sub3' icon={<LaptopOutlined />} title='Users'>
									<Menu.Item key='4'>
										<NavLink to='/users'>Developers</NavLink>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							<Suspense fallback={<Preloader />}>
								<Routes>
									<Route path='/profile' element={<ProfileContainer />}>
										<Route path='/profile/:userId' element={<ProfileContainer />} />
									</Route>
									<Route path='/chat' element={<ChatPage />} />
									<Route path='/dialogs' element={<DialogsContainer />} />
									<Route path='/users' element={<UsersPage pageTitle={'Find Developers'} />} />
									<Route path='/login' element={<LoginPage />} />
									<Route path='/' element={<Navigate to='/profile' />} />
									<Route path='/*' element={<div className='not-found'>404 NOT FOUND</div>} />
								</Routes>
							</Suspense>
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Hotims Network ©2023 Created by Nikolay Hotim</Footer>
			</Layout>
		)
	}
}
const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized })
const AppContainer = connect(mapStateToProps, { initializeApp })(App)
const MainApp: FC = () => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</HashRouter>
	)
}
export default MainApp
