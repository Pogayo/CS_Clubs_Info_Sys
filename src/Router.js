import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Signin from './pages/Signin'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default class AppRouter extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                <Switch>

                    <Route exact path={"/"} component={App} />
                    <Route path={"/sign-in"} component={Signin} />



                </Switch>
            </Router>

        );
    }
}
