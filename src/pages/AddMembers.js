import React, {Component} from 'react'
import Header from "../components/Header"
import  "../css/AddMembers.css"

export default class AddMembers extends Component {
    constructor(props) {
        super(props);

        this.handleAddUsingCSV = this.handleAddUsingCSV.bind(this);
        this.handleClose=this.handleClose.bind(this);

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
                        <p> Only content of this format is allowed. <a href="https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/">What is a csv?</a></p>
                        Upload your CSV file
                        <input type="file"  required/>
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