// import React, {Component} from 'react'
// import Header from "../components/Header"
// import {google} from "googleapis"
// import key from "./service-account.json"
// import * as firebase from "firebase";
//
// const SCOPES = 'https://www.googleapis.com/auth/calendar';
//
// var auth = new google.auth.JWT(
//     key.client_email,
//     null,
//     key.private_key,
//     SCOPES,
//     'YOUR_PRIMARY_EMAIL_ID'
// );
//
// const api = google.calendar({version : "v3", auth : auth});
// const calendarId = 'alueducation.com_7h87scetn2g12tef8p6oit4ljo@group.calendar.google.com';
//
// //Returns metadata for a calendar.
// api.calendars.get({calendarId : calendarId}
//     , function (err, resp) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(resp);
//         }
//     })
//
// //Creates a secondary calendar
// api.calendars.insert({requestBody : { summary : "test2"}},
//     function (err, res) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(res);
//         }
//     })
//
// // Make an authorized request to list Calendar events.
// api.events.list({
//     calendarId: calendarId
// }, function (err, resp) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(resp.data.items);
//     }
// });
//
//
// export default class Schedule extends Component{
//     constructor(props){
//         super(props)
//
//     }
//
//     componentDidMount() {
//     }
//
//
//
//     render(){
//
//         return(<div>
//             <Header/>
//             We are scheduling
//         </div>);
//
// }
//
// }