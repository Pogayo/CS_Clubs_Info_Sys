import React, {Component} from 'react';
import './css/Normalize.css';
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
