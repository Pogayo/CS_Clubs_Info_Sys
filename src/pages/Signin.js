import React, {Component} from 'react';
import bgImage from "../assets/bgd-img.jpg"
import '../css/Signin.css';


const styles = {

};

export default class Signin extends Component {

    render() {
        return (
            <div style={styles} className="bg">
                <div  className="flex-col-centerAll">
                    <h3>CS Clubs</h3>
                    <h4>Sign in</h4>
                    <form>
                        <input type="email" placeholder="Email"/>
                        <button>Next</button>
                    </form>
                    <p> or</p>
                    <button id="sign-in">Sign in with Google</button>
                </div>
            </div>

        );
    }
}