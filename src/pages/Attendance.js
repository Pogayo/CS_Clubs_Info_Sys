import React, {Component} from 'react';
import {AttendanceMember} from './AttendanceMember.js'


class Attendance extends Component{

  constructor(props){
     super(props);

     this.state={
       members:[]
     }
  }

  componentDidMount(){
    
    const db={}

    db.collection("members").get().then((res)=>{
     this.setState({members:res.data});
    }).catch((error)=>{
      console.log(error);
    });
  }


  getMeetings=()=>{
    let meetings
    db.collectin().get( (res)=>{
      meetings=res.data;
    }
    ).then((error)=>{
      console.log("error");
    }
    )

    return meetings
  }
  render(){
    let  num=0;
    const list=members.map((member)=>{
      return <AttendanceMember key={num++} member={member} />
    }
    )
    let options={getMeetings};

    return(<div> 
      <div id="attendance-modal">
        Choose the meeting for which you want to take attendance below
        <Select>
          //List of valid meetings
          //Should add loading for slow connections
          {options}
        </Select>
        Meeting not available?<Link to="" className="link-txt">Create meeting</Link>
      </div>
        {list}
       </div>);
  }
}
