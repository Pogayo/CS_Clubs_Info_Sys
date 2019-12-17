import React from 'react';
import * as firebase from 'firebase';

export default function AttendanceMember(props){

const member=props.member
let meeting_id=props.meeting
console.log(meeting_id) 
const name=member[1]+" "+member[2];
   firebase.firestore().collection("meetings").doc(meeting_id).update(
  {[`attendance.${member[0]}`]:"U"})
  return(
    <div className="member-container">
     <span className="member-name" > {name} </span>
      <select className="attendance-select"   onChange={(e)=>
      { firebase.firestore().collection("meetings").doc("9R48BzyKg4cGkiMOprz9").update(
        {[`attendance.${member[0]}`]:e.target.value});

      }} >
        <option id="" value="U" className="attendance-option" defaultValue>Unexcused Absence</option>
        <option id="" value="P" className="attendance-option">Present</option>
        <option id="" value="L" className="attendance-option">Late</option>
        <option  id="" value="E" className="attendance-option">Excused Absence</option>
      </select>
    </div>
  );
}

