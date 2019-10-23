import React, {Component} from 'react';
import bgImage from "../assets/bgd-img.jpg"
import '../css/Signin.css';
import GoogleLogo from '../assets/google-logo.png'
import * as firebase from "firebase"
import "../index"
import { Redirect } from 'react-router-dom'


const styles = {};
var content;


export default class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName:null,
            user: null,
            email: null,
            password: null
        };
        this.authListener = this.authListener.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderRedirect= this.renderRedirect.bind(this);



    }

    componentDidMount() {
        this.authListener();

    }
    renderRedirect(){
        if (!!firebase.auth().currentUser) {
            return <Redirect to="/home"/>

        }
    }



    handleChange(e) {
        if (e.target.type === "password") {
            this.setState({password: e.target.value})
        } else if (e.target.type === "email") {
            this.setState({email: e.target.value});

        }
        else if (e.target.type === "text") {
            this.setState({displayName: e.target.value});

        }
    }


    handleNext(e) {
        e.preventDefault();

        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.setState({user:u});
            firebase.auth().currentUser.updateProfile({displayName:this.state.displayName})
            console.log(u);

        }).catch((error) => {
            alert(error.message)
        });


    }


    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Listening")
            console.log(user);
            if (user) {
                this.setState({user});

            } else {
                this.setState({user: null});
            }
        });
    }

    render() {

        content = <form style={{width: "100%"}}>
            <input type="text" placeholder="User Name" required onKeyUp={this.handleChange}/>
            <input type="email" placeholder="Email" required onKeyUp={this.handleChange}/>
            <input type="password" placeholder="Password" required onKeyUp={this.handleChange}/>
            <button className="flex-row-centerAll signin-button" onClick={this.handleNext} type="submit" >Next</button>
        </form>;

        return (
            <div style={styles} className="bg flex-col-centerAll">
                {this.renderRedirect()}
                <div className="sign-in">
                    <h1>CS Clubs </h1>
                    <h5>Sign in</h5>
                    {content}
                    <p> or</p>
                    <button id="sign-in" style={{backgroundColor: "#8E65AD", padding: "0.5px"}}
                            className="flex-row-centerAll signin-button">
                        <img src={GoogleLogo} alt="" className="google-logo"/>
                        <span style={{margin: "auto"}}>Sign in with Google</span></button>
                </div>
            </div>

        );
    }
}