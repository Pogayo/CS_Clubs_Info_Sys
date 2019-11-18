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
       members:["Perez Ogayo", "Ogayo, Perez"]
     }
  }

  componentDidMount(){
    

  // db.collection("members").get().then((res)=>{
  //  this.setState({members:res.data});
  // }).catch((error)=>{
  //   console.log(error);
  // });
    console.log(fbase);

    let members=[];
    firebase.firestore().collection.get("members").then((res)=>{
      let member=[]
      res.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        member.push(doc.data);
      });
      return member

        }
    ).catch((error)=>{
      alert(error);
    });

    if(members)this.setState(members);

}


  getMeetings=()=>{
    // let meetings
    // db.collectin().get( (res)=>{
    //   meetings=res.data;
    // }
    // ).then((error)=>{
    //   console.log("error");
    // }
    // )

    // return meetings
  }
  render(){
    let  num=0;
    const list=this.state.members.map((member)=>{
      return <AttendanceMember key={num++} member={member} />
    });

    // let options=this.getMeetings();
    let options=<option>Abb</option>;

    let date="13/09/2019";
    let title="Meeting about xyz";

    return(<div >
     <Header/>
      <div className="" style={{padding:"20px"}}>
      
        <h3>Meeting Date: {date}</h3>
      <h3>Title: {title}</h3>
     <div className="header-bar"> <span>Name  </span>
     <span> Status  </span>
       </div>  
        {list}
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
