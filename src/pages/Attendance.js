import React, {Component} from 'react';
import AttendanceMember from '../components/AttendanceMember.js'
import Header from "../components/Header"
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';
import fbase from  '../FirebaseConfig'



export default class Attendance extends Component{

  constructor(props){
     super(props);

     this.state={
       members:["Perez Ogayo", "Ogayo, Perez"],
       meetings:[],
       meeting:"" //this is a default to avoid errors
     }
  }

  componentDidMount(){
    this.getMeetings()
    let members_data=[];
    firebase.firestore().collection("members").get().then((res)=>{
      let member;
      res.forEach(function(doc) {  
        member=doc.data()
        members_data.push([doc.id, member.Firstname,member.Secondname,]);
      });
      console.log("Hurrayyyyy")
      if(members_data){
        //console.log(members_data)
        this.setState({members:members_data});
      }
  

        }
    ).catch((error)=>{
      alert(error);
    });
    //console.log(members_data)  
}

  getMeetings=()=>{
    const date=new Date();
   
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
      return  year+ "-" + month + "-" +day; 
  } 
     let dateString=formatDate(date)
    console.log(dateString)
    const meetings=[]
    firebase.firestore().collection("meetings").where("date","<=",dateString).get().then(res=>{
      res.forEach(function(doc) {  
        meetings.push({id:doc.id, title:doc.data().title, date:doc.data().date, venue:doc.data().venue});
      });
      console.log(meetings)
      this.setState({meetings:meetings});
     
    }).catch(e=>{
  
      alert( "An error occurred.",e)
    });
     
   
  }

  handleChange=(e)=>{
      if (e.target.checked){
        this.setState({meeting:e.target.value})
        console.log("Got better")
      }
  }
  render(){
    let  num=0;
    const list=this.state.members.map((member)=>{
      return <AttendanceMember key={num++} member={member}  meeting={this.state.meeting}/>
    });

    
    let options=this.state.meetings.map((meeting)=>{
      return <div ><input type="radio" name="meeting" value={meeting.id} onChange={this.handleChange} style={{display:"inline", width:"initial", margin_right:"4px"}}/>
      {meeting.title+", "+meeting.date}</div>
    
    })

    let attendance_body= <div className="" style={{padding:"20px"}}>
      
    {/* <h3>Meeting Date: {date}</h3>
  <h3>Title: {title}</h3> */}
 <div className="header-bar"> <span>Name  </span>
 <span> Status  </span>
   </div>  
    {list}
  </div>



    let date="13/09/2019";
    let title="Meeting about xyz";

    return(<div >
     <Header/>
     <div>
       Choose a meeting
       <div>
         {options}
         Meeting not available?
        <Link to="/add-meeting" className="link-txt">Create meeting</Link>
       </div>

     </div>
     <div>
     {this.state.meeting?attendance_body:"Choose a meeting to take attendance"}
      </div>
       </div>);
  }
}

{/* <div id="attendance-modal" className="flex-col-centerAll">
Choose the meeting for which you want to take attendance below
<select>
  {/*List of valid meetings
  //Should add loading for slow connections*/}
  {/*{options}
</select>
Meeting not available?
<button href="" className="link-txt">Create meeting</button>
</div> */}
