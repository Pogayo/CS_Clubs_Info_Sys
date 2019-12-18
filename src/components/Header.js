import React, {Component} from 'react';
import "../css/Header.css"
import * as firebase from "firebase"
import {NavLink} from "react-router-dom"
import {Redirect, } from 'react-router-dom'
import logo from "../assets/clubs_logo.png"



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
                <NavLink  className="header-link" to="/home" style={{marginRight: "auto", fontWeight:"bold"}}><div >
                    <img alt="logo" src={logo} style={{width:"100px",height:"70px", display:"none"}}></img> ALU-CS CLUBS IS</div></NavLink>
                <div id='header-content'>
                <NavLink  to="/home" className="header-link" activeClassName="chosen">HOME</NavLink>
                <NavLink  to="/add-meeting" className="header-link" activeClassName="chosen">ADD MEETING</NavLink>
               {/* <Link to="/schedule" className="header-link">Schedule a meeting</Link> */}
               <NavLink  to="/take-attendance" className="header-link" activeClassName="chosen">ATTENDANCE</NavLink>
               <NavLink  to="/view-records" className="header-link" activeClassName="chosen">VIEW RECORDS</NavLink>
               <NavLink  to="/add-members" className="header-link" activeClassName="chosen">ADD MEMBERS</NavLink>
                </div>
                <div id="user-pic"></div>
                <div id="user-name" > {firebase.auth().currentUser?firebase.auth().currentUser.displayName: ""}</div>
                <button id="sign-out-button" className="signin-button" onClick={this.signOut}>
                    Sign-out
                </button>
            </header>)
    }

}


