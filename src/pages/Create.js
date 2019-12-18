import React, { Component } from 'react';
import Header from "../components/Header"
import "../css/create.css"
import * as firebase from 'firebase';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        title: "",
        purpose: "",
        date: "",
        eventType: "",
        startTime: "13:00",
        endTime: "13:00",
        venue: "",
      },
      message: "",
      validFields: [],
      formValid: false
    }
  }


  validateField = (field) => {
    const currentHour = 2
    switch (field) {
      case "date":
        const date = new Date();
        const dateString = date.getMonth + "/" + date.getDate + "/" + date.getFullYear;
        if (dateString > this.state.formValues.date) {
          return [1, "You are late"];
        }
        break
      case "startTime":
        if (this.state.formValues.startTime < currentHour - 24) {
          return [0, "You are late"];
        }
        break;
      case "endTime":
        if (this.state.formValues.endTime <= this.state.startTime) {
          this.setState({ formValid: false })
          return [-1, "End time should be greater than your start time"];
        }
        if (this.state.formValues.endTime < currentHour - 24) {
          return [0, "You are late"];
        }
        break;
      default:
        break;
    }
  }

  validateForm = () => {
    for (var i = 0; i < this.state.validFields.length; i++) {
      if (!this.state.validFields[i]) {
        this.setState({ formValid: false });
        break;
      }
    }
    this.setState({ formValid: true });
  }

  
  handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value
     console.log(value)
    this.setState({ ["formValues."+field]: value },
      this.validateField(e, field, value));

    console.log(this.state.formValues[e.target.name]);
    this.validateForm();

  }

  //Will have to set a listener to clear the message after it has been submitted

  handleSubmit = (e) => {
    const dbRef = firebase.firestore().collection("meetings");
    if (this.state.formValid) {
      e.preventDefault();
      console.log("Got here")
      dbRef.add(
        this.state).then((res) => {

          this.setState({ message: "Your entry was successfuly submitted" })

        }).catch((error) => {

          this.setState({ message: "Your entry was not successfuly submitted, try again" })

        }
        );
    }

  
}
  render() {

    return (
      <div>
        <Header />
        <div id="form-container" className="flex-col-centerAll">

          <div>{this.state.message}</div>
          <form onSubmit={this.handleSubmit} className="flex-col-centerAll" id="create-form">
            <input value={this.state.formValues.title} name="title" type="text" onChange={this.handleChange} placeholder="Event title" required />
            <input value={this.state.formValues.purpose} name="purpose" type="text" onChange={this.handleChange} placeholder="Event Purpose" required />
            <select style={{ width: "100%" }}>
              <option>Type of meeting</option>
              <option>Weekly meetup</option>
              <option>Leaders meeting</option>
              <option>Leaders meeting with patron</option>
              <option>Field visit/Activity</option>
              <option>Internal exhibition</option>
              <option>External exhibition</option>
              <option>Other</option>

            </select>
            <input value={this.state.formValues.date} name="date" type="date" onChange={this.handleChange} placeholder="Date" required />
            Start time
      <input value={this.state.formValues.startTime} placeholder="Start time" name="startTime" type="time" onChange={this.handleChange} required />
            End time
      <input value={this.state.formValues.endTime} name="endTime" type="time" onChange={this.handleChange} placeholder="End time" required />
            <input value={this.state.formValues.venue} name="venue" type="text" onChange={this.handleChange} placeholder="Venue" required />
            <button type="submit" className="submit-btn" disabled={!this.state.formValid} onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>)
      ;
  }
}
