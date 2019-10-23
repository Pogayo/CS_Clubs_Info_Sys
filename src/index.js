import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as firebase from 'firebase';
import * as serviceWorker from './serviceWorker';


var config={
    apiKey: "API_KEY",
    authDomain: "clubs-info-sys.firebaseapp.com",
    databaseURL: "https://clubs-info-sys.firebaseio.com",
    projectId: "clubs-info-sys",
    storageBucket: "clubs-info-sys.appspot.com",
    messagingSenderId: "755704539890",
    appId: "1:755704539890:web:497c5bcabb6169f1a3be6b",
    measurementId: "G-JYHEH9SXK5"
};

var fire=firebase.initializeApp(config);
firebase.analytics();

ReactDOM.render(<Router/>, document.getElementById('root'));


serviceWorker.unregister();
export default fire;