import React,{Component} from 'react';
import Header from "../components/Header"
import '../css/Signin.css';
import meeting from "../assets/meeting-icon.png"
import attendance from "../assets/attendance-icon.png"
import schedule from "../assets/schedule-icon.png"
import records from "../assets/records-icon.png"
import {Link} from "react-router-dom"




export default class Home extends Component{



   render (){
       return (<div>
           <Header/>
           <h2 style={{fontSize:"3rem"}}>What would you like to do?</h2>
           <div id="options-container">
               <Link  to="/" className="options-element"><img src={meeting} alt="" className="home-icon" />Create a meeting</Link>
               <div className="options-element"><img src={schedule} alt="" className="home-icon" />Schedule a meeting</div>
               <div className="options-element"><img src={attendance} alt="" className="home-icon" />Take attendance</div>
               <div className="options-element"><img src={records} alt="" className="home-icon" /> View Records</div>

           </div>
       </div>);
   }
}