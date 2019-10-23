import React, {Component} from 'react';
import "../css/Header.css"
import * as firebase from "firebase"
import {Redirect, } from 'react-router-dom'



export default class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            redirect:false
        }

        this.renderRedirect=this.renderRedirect.bind(this);
        this.signOut=this.signOut.bind(this);
        this.authListener=this.authListener.bind(this);

    }
    componentDidMount() {
        this.authListener();

    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Listening")
            console.log(user);
            if (user) {
                this.setState({redirect:false});

            } else {
                this.setState({redirect:true});
            }
        });
    }

    renderRedirect(){

       console.log("I am here");
        if(this.state.redirect){
            console.log("I got here");

            return <Redirect to="/"/>}


    }

    signOut(cb) {
        firebase.auth().signOut();
        console.log("Clicked the button");
        localStorage.removeItem('user');
        this.setState({redirect:true})

    }
    render() {

        return (
            <header>
                {this.renderRedirect()}
                <div style={{marginRight: "auto"}}>CS clubs Info System</div>
                <div id="user-pic"></div>
                <div id="user-name" > {firebase.auth().currentUser?firebase.auth().currentUser.displayName: ""}</div>
                <button id="sign-out-button" className="signin-button" onClick={this.signOut}>
                    Sign-out
                </button>
            </header>)
    }

}


