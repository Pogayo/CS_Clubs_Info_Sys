import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './css/Normalize.css';
import Home from  './pages/Home'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Signin from "./pages/Signin";
import * as firebase from "firebase"
import { Redirect } from 'react-router-dom'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
    });
  }

  render() {

    return (
        <div>
          {this.state.user?<Redirect to="/home"/>:<Redirect to="/sign-in"/>}
        </div>);
  }
}
