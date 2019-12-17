import React, {Component} from 'react';
import "../css/Header.css"
import * as firebase from "firebase"
import {Link} from "react-router-dom"
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
            console.log(user);
            if (user) {
                this.setState({redirect:false});

            } else {
                this.setState({redirect:true});
            }
        });
    }

    renderRedirect(){
        if(this.state.redirect){


            return <Redirect to="/"/>}


    }

    signOut(cb) {
        firebase.auth().signOut();
        localStorage.removeItem('user');
        this.setState({redirect:true})

    }
    render() {

        return (
            <header>
                {this.renderRedirect()}
                <div style={{marginRight: "auto"}}>CS clubs Info System</div>
                <div id='header-content'>
                <Link  to="/home" className="header-link">Home</Link>
                <Link  to="/add-meeting" className="header-link">Add a meeting</Link>
               {/* <Link to="/schedule" className="header-link">Schedule a meeting</Link> */}
               <Link  to="/take-attendance" className="header-link">Take attendance</Link>
               <Link  to="/view-records" className="header-link"> View Records</Link>
               <Link  to="/add-members" className="header-link">Add members</Link>
                </div>
                <div id="user-pic"></div>
                <div id="user-name" > {firebase.auth().currentUser?firebase.auth().currentUser.displayName: ""}</div>
                <button id="sign-out-button" className="signin-button" onClick={this.signOut}>
                    Sign-out
                </button>
            </header>)
    }

}


