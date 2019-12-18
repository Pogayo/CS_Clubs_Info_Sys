import React, { Component } from 'react';
import AttendanceMember from '../components/AttendanceMember.js'
import Header from "../components/Header"
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import "../css/attendance.css"


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress &&

    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#00b2a9" height="100" width="100" />
    </div>
  );
}

export default class Attendance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      members: [],
      meetings: [],
      meeting: "" //this is a default to avoid errors
    }
  }

  componentDidMount() {
    this.getMeetings()
    let members_data = [];
    trackPromise(firebase.firestore().collection("members").get().then((res) => {
      let member;
      res.forEach(function (doc) {
        member = doc.data()
        members_data.push([doc.id, member.Firstname, member.Secondname,]);
      });
      if (members_data) {
        //console.log(members_data)
        this.setState({ members: members_data });
      }

    }
    ).catch((error) => {
      alert(error);
    }));
    //console.log(members_data)  
  }

  getMeetings = () => {
    const date = new Date();

    function formatDate(date) {
      var day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var year = date.getFullYear();
      return year + "-" + month + "-" + day;
    }
    let dateString = formatDate(date)
    console.log(dateString)
    const meetings = []
    trackPromise(firebase.firestore().collection("meetings").where("date", "<=", dateString).get().then(res => {
      res.forEach(function (doc) {
        meetings.push({ id: doc.id, title: doc.data().title, date: doc.data().date, venue: doc.data().venue });
      });
      console.log(meetings)
      this.setState({ meetings: meetings });

    }).catch(e => {

      alert("An error occurred.", e)
    }));


  }

  handleChange = (e) => {
    if (e.target.checked) {
      this.setState({ meeting: e.target.value })
      console.log("Got better")
    }
  }
  render() {
    let num = 0;
    const list = this.state.members.map((member) => {
      return <AttendanceMember key={num++} member={member} meeting={this.state.meeting} />
    });


    let options = this.state.meetings.map((meeting, index) => {
      return <div ><input type="radio" name="meeting" value={index} onChange={this.handleChange} style={{ display: "inline", width: "initial", margin_right: "4px" }} />
        {" " + meeting.title + ", " + meeting.date}</div>

    })

    let attendance_body = <div className="" style={{ padding: "20px" }}>
     {this.state.meeting?<div style={{padding:"10px",fontWeight:"bold"}}>
      <span>Date: {this.state.meetings[this.state.meeting].date+" | "}</span>
      <span>Title: {this.state.meetings[this.state.meeting].title+" | "}</span>
      <span>Venue: {this.state.meetings[this.state.meeting].venue}</span>
      </div>:
      ""}
      <div className="header-bar"> <span>Name  </span>
        <span> Status  </span>
      </div>
      <LoadingIndicator />
      {list}
    </div>

    return (<div className="flex-col-centerAll">
      <Header />
      <div id="choose-meeting">
        Choose a meeting below to take attendance<br /><br />
        <div>
          <LoadingIndicator />
          {this.state.meetings ? options : <h4 style={{ color: "rgba(127,57,140,0.9)" }}>No meetings available!</h4>}
          <br />Meeting not available?
        <Link to="/add-meeting" className="link-txt">Create meeting</Link>
        </div>

      </div>
      <div>
        {this.state.meeting ? attendance_body : <h3 style={{ color: "rgba(127,57,140,0.9)" }}>You haven't chosen a meeting yet!</h3>}
      </div>
    </div>);
  }
}
