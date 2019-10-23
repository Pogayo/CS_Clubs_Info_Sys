import React, {Component} from 'react'
import Header from "../components/Header"
import { Link } from 'react-router-dom'
import  "../css/AddMembers.css"
import * as firebase from "firebase"


export default class AddMembers extends Component {
    constructor(props) {
        super(props);

        this.handleAddUsingCSV = this.handleAddUsingCSV.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleUpload=this.handleUpload.bind(this);

        this.state={
            modalStyle:{display:"none"}
        }
    }

    handleAddUsingCSV() {
    //    Should display a pop up with instructions on the data format in the csv
        this.setState( {modalStyle:{display:"block"}});
    }

    handleClose(){
        this.setState( {modalStyle:{display:"none"}});

    }

    handleUpload(e){
        // let files = e.target.files;
        if (window.FileReader) {
            // FileReader are supported.
            getAsText(e.target.files[0]);
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    render() {
        return (<div>
            <Header/>
            {/*Will be used for those who already have their data on a google form*/}
            <button onClick={this.handleAddUsingCSV}>Add members using a csv file</button>

            {/*....................The pop-up text....................*/}
            <div className="modal" style={this.state.modalStyle}>

                <div className="modal-content">
                    <form>
                        <div className="close" onClick={this.handleClose}>&times;</div>
                        <p> Only content of this format is allowed
                            Firstname, LastName,Email, Year, Major, isLeader
                            <h4>Restrictions</h4>
                            <ul>
                                <li>First Name: a valid string max 100 characters</li>
                                <li>Last Name: a valid string max 100 characters</li>
                                <li>Email: Has to be a valid email with '.' and '@'</li>
                                <li>Year: Options->'Year 1','Year 2','Year 3','Year 4'</li>
                                <li>Major: Options->'ibt','cs','gc','lc','ent'</li>
                                <li>isLeader: Options->'true','false'</li>
                            </ul>
                            <Link className="link-btn" to="sample-members.csv"  target="_blank" download>Download sample File</Link>
                            <a href="https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/">What is a csv?</a></p>
                        Upload your CSV file
                        <input type="file" onChange={this.handleUpload} required/>
                        <button type="submit">Upload your file</button>
                    </form>
                </div>
            </div>

            {/*....................The pop-up text....................*/}

            <form>
                <input type="text" className="add-member-input" placeholder="Firstname Lastname"/>
                <input type="email" className="add-member-input" placeholder="Email"/>
                <input type="text" className="add-member-input" placeholder="Year"/>
                <select>
                    <option value="gc">Global Challenges</option>
                    <option value="cs" defaultValue>Computer Science</option>
                    <option value="ibt">International Business and Trade</option>
                    <option value="ent">Entrepreneurship</option>
                    <option value="lc">Leadership Core</option>

                </select>
                <div>
                    Is this member a leader?
                    <input type="radio" name="leader"/>True <br/>
                    <input type="radio" name="leader" defaultChecked/>False <br/>
                </div>
                <button>Add a custom field</button>
                <button type="submit">Add user</button>

            </form>
        </div>)
    }

}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
        for (var j=0; j<data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    console.log(lines);
    for (var i=0; i<lines.length; i++) {
        if(lines[i].length===6){
            saveMember(lines[i]);
        }

    }

    }

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function saveMember(member) {
    // Add a new message entry to the database.
    return firebase.firestore().collection('members').add({
        Firstname: member[0],
        Secondname: member[1],
        email: member[2],
        Year:member[3],
        Major:member[4],
        isLeader:member[5],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
        console.error('Error writing new message to database', error);
    });
}