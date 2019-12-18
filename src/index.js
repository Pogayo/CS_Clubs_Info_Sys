import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as firebase from 'firebase';
import * as serviceWorker from './serviceWorker';
import './FirebaseConfig'



ReactDOM.render(<Router/>, document.getElementById('root'));


serviceWorker.unregister();
