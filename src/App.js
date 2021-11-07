import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className='app-wrapper'>
            <header className='header'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png'
                    alt='Juventus logo' />
            </header>

            <nav className='nav'>
                <div>
                    <a>Prifile</a>
                </div>

                <div>
                    <a>Messages</a>
                </div>

                <div>
                    <a>News</a>
                </div>

                <div>
                    <a>Music</a>
                </div>

                <div>
                    <a>Settings</a>
                </div>
            </nav>

            <div className='content'>
                <div className='background-image'>
                    <img src='https://lh3.googleusercontent.com/proxy/1nDv17_d_DBx_xQEdXQHXISY-YiP3CozrpVeEmlgrC0BhuSOsf9ErehYX1DayJudBCCmqT-YzQUfnm8JN5zGPASjjqel2TavX2F3yHxeqfLBHsyag2YZIFIaNkEQCVN6nSQ'
                        alt='Savanna' />
                </div>

                <div className='avatar-with-descriptions'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabBDvUo74Unf7YNUQJHivkHeRvymbm2CcWQ&usqp=CAU'
                        alt='Zebra' />

                    <div className='descriptions'>
                        <p>Nikolay Hotim</p>
                        <p>23.12.1992</p>
                        <p>Grodno city</p>
                        <p>Front-end developer (HTML5, CSS3, JavaScript, React)</p>
                    </div>
                </div>

                <div className='my-posts'>
                    <p>My posts</p>

                    <div className='new-post'>
                        New post
                    </div>

                    <div>
                        <div>
                            Post 1
                        </div>

                        <div>
                            Post 2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
