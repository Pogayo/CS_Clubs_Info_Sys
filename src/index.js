import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';


var config={
    apiKey: "AIzaSyA9Axkckj4kk1npt9_kYQXPcaxHqwPbTzU",
    authDomain: "clubs-info-sys.firebaseapp.com",
    databaseURL: "https://clubs-info-sys.firebaseio.com",
    projectId: "clubs-info-sys",
    storageBucket: "clubs-info-sys.appspot.com",
    messagingSenderId: "755704539890",
    appId: "1:755704539890:web:497c5bcabb6169f1a3be6b",
    measurementId: "G-JYHEH9SXK5"
};

firebase.initializeApp(config);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
