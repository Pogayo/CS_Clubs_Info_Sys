import React, {Component} from 'react';
import "./create.css";


export default class Create extends Component{
  constructor(props){
    super(props);
    this.state={
      title:"",
      purpose:"",
      date:"",
      eventType:"",
      startTime:"13:00",
      endTime:"",
      venue:"", 
      message:"" , 
      validFields:[],
      formValid:false
    }
  }
   handleChange=(e)=>{
     const field=e.target.name;
     const value=e.target.value
    
    this.setState({[field]:value},
      this.validateField(e,field,value));

    console.log(this.state[e.target.name]);

  }

  validateField=(field)=>{
    const currentHour=2
     switch(field){
       
       case "date":
         const date=new Date();
         const  dateString=date.getMonth+"/" +date.getDate+"/"+ date.getFullYear;
         if  (dateString>this.state.date){
          return [1, "You are late"] ;
         }
         break
       case "startTime":
         console.log("We are in")
         if (this.state.startTime< currentHour-24){
          return [0, "You are late"] ;
         }
         break;
      case "endTime":
        if (this.state.endTime<=this.state.startTime){
          this.setState({formValid:false})
          return [-1, "End time should be greater than your start time"];
        }
        if (this.state.endTime< currentHour-24){
         return [0, "You are late"] ;
        }
        break;
         default:
           break;
     }
    }
     
    validateForm=()=>{
       for(var i=0; i<this.state.validFields.length;i++){
         if(!this.state.validFields[i]){
           this.setState({validForm:false});
           break;
         }
       }
       this.setState({validForm:true});

     }

  //Will have to set a listener to clear the message after it has been submitted

  handleSubmit=(e)=>{
    const db={};   //firebase.firestore();
     e.preventDefaut();
     db.collection("meetings").set().then((res)=>{
      
      this.setState({message:"Your entry was successfuly submitted"})

     }).catch((error)=>{
      
      this.setState({message:"Your entry was not successfuly submitted, try again"})

     }
     );
     
  }
  render(){

    return (
    <div id="form-container" className="flex-col-centerAll">
      <div>{this.state.message}</div>
      <form  onSubmit={this.handleSubmit} className="flex-col-centerAll">
      <input value={this.state.title} name="title" type="text" onChange={this.handleChange} placeholder="Event title" required/>
      <input value={this.state.purpose} name="purpose" type="text" onChange={this.handleChange} placeholder="Event Purpose" required/>
      <select>
        <option>Type of meeting</option>
        <option>Weekly meetup</option>
        <option>Leaders meeting</option>
        <option>Leaders meeting with patron</option>
        <option>Field visit/Activity</option>
        <option>Internal exhibition</option>
        <option>External exhibition</option>
        <option>Other</option>

      </select>
      <input value={this.state.date} name="date" type="date" onChange={this.handleChange} placeholder ="Date" required/>
      <input value={this.state.startTime} name="startTime" type="time" onChange={this.handleChange} placeholder ="Start time" required/>
      <input value={this.state.endTime} name="endTime" type="time" onChange={this.handleChange} placeholder ="End time" required/>
      <input value={this.state.venue} name="venue" type="text" onChange={this.handleChange} placeholder ="Venue" required/>
      <button type="submit" className="submit-btn" disabled={!this.state.formValid}>Submit</button>
      </form>
    </div>)
    ;
  }
}
