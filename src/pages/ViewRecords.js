import React, {Component} from 'react';
import Header from "../components/Header"
//import {NavLink} from 'react-router-dom';
import * as firebase from 'firebase';


export default class ViewRecords extends Component{

    render(){
        return (
            <div className="flex-col-centerAll">
                <Header/>
                <br/>
                <div>This feature is coming soon. Thank you for your patience.<br/> You will be able to do the following: </div><br/>
                <div>
                <input className="" type="radio" name="meeting" value={1}  style={{ display: "inline", width: "initial", margin_right: "4px" }}/> View records of a particular meeting<br/>
                <input className="" type="radio" name="meeting" value={2} style={{ display: "inline", width: "initial", margin_right: "4px" }}/> View records of a student<br/>
                <input className="" type="radio" name="meeting" value={2} style={{ display: "inline", width: "initial", margin_right: "4px" }}/> View summaries of a meeting<br/>
                <input className="" type="radio" name="meeting" value={4}  style={{ display: "inline", width: "initial", margin_right: "4px" }}/> View summaries for all meetings so far<br/>
                <input className="" type="radio" name="meeting" value={5} style={{ display: "inline", width: "initial", margin_right: "4px" }}/> View summaries for a year<br/>
                </div>
            </div>);
    }
}