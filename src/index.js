import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
    { id: 1, message: 'Hi! How are you?', likesCount: 20 },
    { id: 2, message: 'It\'s my first post', likesCount: 15 },
    { id: 3, message: 'Forza Juve!', likesCount: 30 },
    { id: 4, message: 'Nikolay is number 1!', likesCount: 35 }
];

let dialogs = [
    { id: 1, name: 'Andrey' },
    { id: 2, name: 'Denis' },
    { id: 3, name: 'Katya' },
    { id: 4, name: 'Mum' },
    { id: 5, name: 'Dad' }
];

let messages = [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo!' },
    { id: 4, message: 'Yo!' },
    { id: 5, message: 'Yo!' }
];

ReactDOM.render(
    <React.StrictMode>
        <App posts={posts} dialogs={dialogs} messages={messages} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();