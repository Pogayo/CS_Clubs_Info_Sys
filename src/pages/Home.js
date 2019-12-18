import React,{Component} from 'react';
import Header from "../components/Header"
import '../css/Signin.css';
import meeting from "../assets/meeting-icon.png"
import attendance from "../assets/attendance-icon.png"
import schedule from "../assets/schedule-icon.png"
import records from "../assets/records-icon.png"
import addMember from "../assets/addMember-icon.png"




import {Link} from "react-router-dom"




export default class Home extends Component{


   render (){
       return (<div className="flex-col-centerAll">
           <Header/>
           <p style={{fontSize:"2.5rem" , padding:"0px 20px", textAlign:"center", fontWeight:"normal"}}>What would you like to do?</p>
           <div id="options-container">
               <Link  to="/add-meeting" className="options-element"><img src={meeting} alt="" className="home-icon" />Add a meeting</Link>
               <Link style={{display:"none"}} to="/schedule" className="options-element"><img src={schedule} alt="" className="home-icon" />Schedule a meeting</Link>
               <Link  to="/take-attendance" className="options-element"><img src={attendance} alt="" className="home-icon" />Take attendance</Link>
               <Link  to="/view-records" className="options-element"><img src={records} alt="" className="home-icon" /> View Records</Link>
               <Link  to="/add-members" className="options-element"><img src={addMember} alt="" className="home-icon" />Add members</Link>

           </div>
       </div>);
   }
}