import React, {Component} from 'react';
import bgImage from "../assets/bgd-img.jpg"
import '../css/Signin.css';


const styles = {

};

export default class Signin extends Component {

    render() {
        return (
            <div style={styles} className="bg flex-col-centerAll">
                <div  className="">
                    <h3>CS Clubs</h3>
                    <h5>Sign in</h5>
                    <form>
                        <input type="email" placeholder="Email" required/>
                        <button>Next</button>
                    </form>
                    <p> or</p>
                    <button id="sign-in">Sign in with Google</button>
                </div>
            </div>

        );
    }
}