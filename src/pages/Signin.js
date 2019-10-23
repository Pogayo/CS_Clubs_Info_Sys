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
        if (this.state.user) {
        }
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
            console.log("Here")
            this.setState({email: e.target.value});

        }
    }


    handleNext(e) {
        e.preventDefault();

        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.setState({user:u})
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
                localStorage.setItem('user', user.uid);
                localStorage.setItem('email', user.email);

            } else {
                this.setState({user: null});
                localStorage.removeItem('user');
            }
        });
    }

    render() {

        // if (this.state.email && this.state.password){
        // //    route to next page
        // }
        content = <form style={{width: "100%"}}>
            <input type="email" placeholder="Email" required onKeyUp={this.handleChange}/>
            <input type="password" placeholder="Password" required onKeyUp={this.handleChange}/>
            <button className="flex-row-centerAll signin-button" onClick={this.handleNext} type="submit" >Next</button>
        </form>;

        return (
            <div style={styles} className="bg flex-col-centerAll">
                {this.renderRedirect}
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