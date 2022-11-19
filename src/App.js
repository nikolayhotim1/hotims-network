import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersConatainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReduser';
import Preloader from './components/common/Preloader/Preloader';

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
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
                    <Routes>
                        <Route
                            path='/profile'
                            element={<ProfileContainer />}
                        >
                            <Route
                                path='/profile/:userId'
                                element={<ProfileContainer />}
                            />
                        </Route>

                        <Route
                            path='/dialogs'
                            element={<DialogsContainer />}
                        />

                        <Route
                            path='/users'
                            element={<UsersConatainer />}
                        />

                        <Route
                            path='/login'
                            element={<Login />}
                        />

                        <Route path='/news' element={<News />} />
                        <Route path='/music' element={<Music />} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized });

export default connect(mapStateToProps, { initializeApp })(App);