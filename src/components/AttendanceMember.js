import React, {Component} from 'react';



export default function AttendanceMember(props){

const member=props.member
  return(
    <div>
     <span id="member-name"> {member.nam} </span>
      <Select>
        <option id="" value="U" className="attendance-option" defaultValue>>Unexcused Absence</option>
        <option id="" value="P" className="attendance-option">Present</option>
        <option id="" value="L" className="attendance-option">>Late</option>
        <option  id="" value="E" className="attendance-option">Excused Absence</option>
      </Select>
    </div>
  );
}
