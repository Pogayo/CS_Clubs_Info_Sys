import React, {Component} from 'react';
import '../css/Signin.css';
import GoogleLogo from '../assets/google-logo.png'
import * as firebase from "firebase"
import "../index"
import { Redirect } from 'react-router-dom'


const styles = {
    padding:"30px"
};
var content;


export default class Login extends Component {
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
        this.signInGoogle=this.signInGoogle.bind(this);


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

    signInGoogle(){
        var provider =new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({user:result.user});
            console.log("got here")
            firebase.auth().currentUser.updateProfile({displayName:this.state.displayName})
            console.log(result.user);
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
            <input  style={{display:"none"}} type="text" placeholder="User Name" required onKeyUp={this.handleChange}/>
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

                    <div className="orCentered">or </div>

                    <button id="sign-in" style={{backgroundColor: "#8E65AD", padding: "0.5px",margin:"10px 0" }}
                            className="flex-row-centerAll signin-button"  onClick={this.signInGoogle}>
                        <img src={GoogleLogo} alt="" className="google-logo"
                       />
                        <span style={{margin: "auto"}}>Sign in with Google</span></button>
                </div>
            </div>

        );
    }
}