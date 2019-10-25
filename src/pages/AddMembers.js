import React, {Component} from 'react'
import Header from "../components/Header"
import {Link} from 'react-router-dom'
import "../css/AddMembers.css"
import * as firebase from "firebase"
import AddUsingCSV from "../components/AddUsingCSV";


export default class AddMembers extends Component {
    constructor(props) {
        super(props);

        this.handleAddUsingCSV = this.handleAddUsingCSV.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            modalStyle: {display: "none"},
            uploadSuccess: "",
            uploadmessagestyle: {padding: "10px", color: "green"}
        }
    }

    handleAddUsingCSV() {
        //    Should display a pop up with instructions on the data format in the csv
        this.setState({modalStyle: {display: "block"}});
    }

    handleClose() {
        this.setState({modalStyle: {display: "none"}});

    }

    handleUpload(e) {
        if (window.FileReader) {
            // FileReader are supported.
            getAsText(e.target.files[0]);
            this.handleClose();
            this.setState({uploadSuccess: "File successfully uploaded"})
        } else {
            alert('FileReader are not supported in this browser.');
            this.setState({uploadSuccess: "File upload not successful. Try again"})
            this.setState({uploadmessagestyle: {padding: "20px", color: "red"}})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var values = [];
        for (var i = 0; i < 7; i++) {
            if (i === 5 || i === 6) {
                if (!e.target[i].checked) {
                    continue;
                }
            }

            values.push(e.target[i].value);
        }

        for (var i = 0; i < 7; i++) {
            saveMember(values);
            this.setState({uploadSuccess:"Member added Successfully"});

        }
        e.target.reset();

    }

    render() {
        return (<div>
            <Header/>
            <div className="modal" style={this.state.modalStyle}>

                <AddUsingCSV handleUpload={this.handleUpload} handleClose={this.handleClose}/>
            </div>

            <div className="flex-col-centerAll">
                {/*Will be used for those who already have their data on a google form*/}
                <div style={this.state.uploadmessagestyle}>{this.state.uploadSuccess}</div>
                <button onClick={this.handleAddUsingCSV} className="link-btn" style={{}}>Add members using a csv file
                </button>

                <div className="orCenteredPurple">or</div>
                <form className="flex-col-centerAll " id="add-member-form" onSubmit={this.handleSubmit}>
                    <input type="text" className="add-member-input" placeholder="Firstname" required/>
                    <input type="text" className="add-member-input" placeholder="Lastname" required/>
                    <input type="email" className="add-member-input" placeholder="Email" required/>
                    {/*<input type="text" className="add-member-input" placeholder="Year" required/>*/}
                    <select className="add-member-input  add-member-select" id="select-year" required style={{marginBottom:"10px"}}>
                        <option value="1">Year 1</option>option>
                        <option value="2" defaultValue>Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>

                    </select>
                    <select className="add-member-input add-member-select" id="select-major" required>
                        <option value="gc">Global Challenges</option>
                        <option value="cs" defaultValue>Computer Science</option>
                        <option value="ibt">International Business and Trade</option>
                        <option value="ent">Entrepreneurship</option>
                        <option value="lc">Leadership Core</option>

                    </select>
                    <div id="gender-container">
                        <div>Is this member a leader?</div>
                        <div><input type="radio" className="gender-sel" name="is-leader" value="true"/>True<br/></div>
                        <div><input type="radio" className="gender-sel" name="is-leader" value="false" defaultChecked/>False
                        </div>
                    </div>
                    <button className="link-btn">Add a custom field</button>
                    <button className="link-btn" type="submit">Add Member</button>

                </form>
            </div>
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
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
        for (var j = 0; j < data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length === 6) {
            saveMember(lines[i]);
        }

    }

}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function saveMember(member) {
    // Add a new message entry to the database.
    return firebase.firestore().collection('members').add({
        Firstname: member[0],
        Secondname: member[1],
        email: member[2],
        Year: member[3],
        Major: member[4],
        isLeader: member[5],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.log("Failleed");
        alert("The member was not successfully added. This might be because you do not have permissions to add members to this club");
        console.error('Error writing new message to database', error);
    });
}