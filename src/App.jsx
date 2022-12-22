import React, { Component, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReduser';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/reduxStore';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersConatainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

class App extends Component {
    catchAllUnhandledErrors = (reason, promise) => {
        console.log(`Some error occured: ${reason}, ${promise}`);
    };
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
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
                            <Route path='/users' element={<UsersConatainer />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/news' element={<News />} />
                            <Route path='/music' element={<Music />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/' element={<Navigate to='/profile' />} />
                            <Route path='/*' element={<div>404 NOT FOUND</div>} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized });
const AppContainer = connect(mapStateToProps, { initializeApp })(App);
const MainApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    );
};

export default MainApp;