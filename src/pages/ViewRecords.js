import React, {Component} from 'react';
import AttendanceMember from '../components/AttendanceMember.js'
import Header from "../components/Header"
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import fbase from  '../FirebaseConfig'

export default class ViewRecords extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Header/>
                View records of a particular meeting
                View records of a student
                View summaries of a meeting
                View summaries for all meetings so far
                View summaries for a year
            </div>);
    }
}