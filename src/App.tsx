import { Component, FC, lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import HeaderContainer from './components/Header/HeaderContainer'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/reduxStore'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersPage = lazy(() => import('./components/Users/UsersPage').then((module) => ({ default: module.UsersPage })))
const LoginPage = lazy(() => import('./components/Login/LoginPage').then((module) => ({ default: module.LoginPage })))
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
			<div className='app-wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app-wrapper-content'>
					<Suspense fallback={<Preloader />}>
						<Routes>
							<Route path='/profile' element={<ProfileContainer />}>
								<Route path='/profile/:userId' element={<ProfileContainer />} />
							</Route>
							<Route path='/dialogs' element={<DialogsContainer />} />
							<Route path='/users' element={<UsersPage pageTitle={'Samurai'} />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/news' element={<News />} />
							<Route path='/music' element={<Music />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='/*' element={<div className='not-found'>404 NOT FOUND</div>} />
						</Routes>
					</Suspense>
				</div>
			</div>
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
