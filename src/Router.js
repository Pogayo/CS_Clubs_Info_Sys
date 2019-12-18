import React, {Component} from 'react';
import App from './App';
import Login from './pages/Login'
import Home from './pages/Home'
import AddMembers from './pages/AddMembers'
import Schedule from "./pages/Schedule"
import Attendance from "./pages/Attendance";
import Create from "./pages/Create.js"
import ViewRecords from "./pages/ViewRecords"

import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

export default class AppRouter extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                <Switch>

                    <Route exact path={"/"} component={App} />
                    <Route path={"/sign-in"} component={Login} />
                    <Route path={"/home"} component={Home} />
                    <Route path={"/add-members"} component={AddMembers} />
                    <Route path={"/take-attendance"} component={Attendance} />
                    <Route path={"/schedule"} component={Schedule} />
                    <Route path={"/add-meeting"} component={Create} />
                    <Route path={"/view-records"} component={ViewRecords} />
                    
                </Switch>
            </Router>

        );
    }
}
