import {Link} from "react-router-dom";
import React from "react";


export default function AddUsingCSV(props) {
    return (<div className="modal-content">
        <form>
            <div style={{textAlign: "right", width: "100%", marginTop: "-25px"}}>
                <div className="close" onClick={props.handleClose}>&times;</div>
            </div>
            Only content of this format is allowed:<br/>
            Firstname, LastName,Email, Year, Major, isLeader
            <h4>Restrictions</h4>
            <ul>
                <li>First Name: a valid string max 100 characters</li>
                <li>Last Name: a valid string max 100 characters</li>
                <li>Email: Has to be a valid email with '.' and '@'</li>
                <li>Year: Options->'1','2','3','4'</li>
                <li>Major: Options->'ibt','cs','gc','lc','ent'</li>
                <li>isLeader: Options->'true','false'</li>
            </ul>
            <Link className="link-btn" to="sample-members.csv" target="_blank" download>Download sample
                File</Link>
            <a href="https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/"
               className="smaller-link-text">What is a csv?</a>
            <input type="file" name="file" id="file" onChange={props.handleUpload} required
                   className="upload-file"/>
            <label htmlFor="file" className="link-btn">Upload your CSV file</label>
        </form>
    </div>);
}