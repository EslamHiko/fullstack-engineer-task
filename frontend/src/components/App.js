import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.exportCSV = this.exportCSV.bind(this);
    this.clearCandidates = this.clearCandidates.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
  }

  /**
   * Function to export current candidates as CSV file
   */
  exportCSV(){
    return ()=>{
      window.open("http://localhost:5000/export")
    }
  }

  /**
   * Function to import candidates from csv
   * @param  {event} e
   */
  importCSV(e){
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    fetch('http://localhost:5000/import-csv', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(
      response => {
        this.props.refreshCandidates()
        alert('Candidates have been imported Successfully !')
      }
    );
  }

  /**
   * Function to truncate candidates table
   */
  clearCandidates(){
    return () => {
      fetch('http://localhost:5000/graphql', {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `mutation { TruncateCandidates { ok } }`}),
      }).then(
        response => {
          this.props.refreshCandidates()
          alert('All candidates have been removed !')
        }
      );
    }
  }
  /**
   * Function to trigger input file click
   */
  clickOnFile(){
      $('[type="file"]').click()
  }
  /**
   * Function to filter Candidates by their jobs
   */
  filterCandidates(e){

    $('[placeholder="Search"]').val('')
    const job = e.target.value

    let candidates = this.props.original.filter(candidate=>{
      if(job == 'All Candidates') // if the filter is off
        return true
      return candidate['job'] == job
    });

    this.props.refreshCandidates(candidates)


  }
  render() {
    const rates = {
      '0':'Failed',
      '1':'Failed',
      '2': 'Very Poor',
      '3':'Very Poor',
      '4':'Poor',
      '5':'Fair',
      '6':'Good',
      '7':'Good',
      '8':'Very Good',
      '9':'Excellent',
      '10':'Excellent'
    };
    const candidates = this.props.candidates.map((candidate,index) =>
       (
         <tr key={index}>
           <td>{candidate.uuid}</td>
           <td>{candidate.email}</td>
           <td>{candidate.first_name}</td>
           <td>{candidate.last_name}</td>
           <td>{candidate.logic_test_score+" "} </td>
           <td>{candidate.job}</td>
           <td>{rates[candidate.logic_test_score]}</td>
           <td>
           <Link className="nav-link" to={`/edit/${candidate.uuid}`}>Edit</Link>
           <Link className="nav-link" to={`/remove/${candidate.uuid}`} >Remove</Link>
           </td>
        </tr>
      )
    );

    var jobs = this.props.jobs;
    jobs = jobs.map((job,index) => {
      return (<option key={index} value={job}>{job}</option>)
    })
    return (
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Candidates</h1>
              <select onChange={this.filterCandidates.bind(this)}>
              <option defaultValue="">All Candidates</option>
              {jobs}
              </select>
              <p>{this.props.msg}</p>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button type="button" onClick={this.exportCSV()} className="btn btn-sm btn-outline-secondary">Export</button>
                  <button type="button" onClick={this.clickOnFile.bind(this)} className="btn btn-sm btn-outline-secondary">Import</button>
                  <input className="inputBtn" type="file" onChange={this.importCSV.bind(this)} id="file"/>
                  <button type="button" onClick={this.clearCandidates()} className="btn btn-sm btn-outline-secondary">Clear*</button>

                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Logic Test Score</th>
                    <th>Job</th>
                    <th>Rate</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates}
                </tbody>
              </table>
            </div>
          </main>
        )
  }
}
export default App
