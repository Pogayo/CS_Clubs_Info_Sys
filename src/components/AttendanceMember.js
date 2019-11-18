import React from 'react';

export default function AttendanceMember(props){

const member=props.member
  return(
    <div className="member-container">
     <span className="member-name" > {member} </span>
      <select className="attendance-select" >
        <option id="" value="U" className="attendance-option" defaultValue>Unexcused Absence</option>
        <option id="" value="P" className="attendance-option">Present</option>
        <option id="" value="L" className="attendance-option">Late</option>
        <option  id="" value="E" className="attendance-option">Excused Absence</option>
      </select>
    </div>
  );
}
