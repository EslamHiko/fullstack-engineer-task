import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'

class RemoveWarning extends Component {
  constructor(props){
    super(props)
    var candidate = {};
    if(this.props.match){
      candidate = this.props.candidates.filter((candidate)=>{
        return candidate.uuid == this.props.match.params.uuid
      })[0]
    }
    this.state = {candidate:candidate}
  }
  removeCandidate(e){
    const uuid = e.target.getAttribute('user-uuid')
    const query = `mutation {
  RemoveCandidate(uuid:${uuid}){
      ok
  }
}
`
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query})
    }).then(
      response => {
        this.props.refreshCandidates()
        alert('Candidate was removed Successfully !')
        this.props.history.push('/')
      }
    );
  }
  render() {
    const candidate = this.state.candidate
    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div className="jumbotron">
          <h1 style={{color:'red'}}>Are you sure you want to delete this Candidate?</h1>
          <p className="lead">uuid: <b>{candidate.uuid}</b></p>
          <p className="lead">email: <b>{candidate.email}</b></p>
          <p className="lead">First Name: <b>{candidate.first_name}</b></p>
          <p className="lead">Last Name: <b>{candidate.last_name}</b></p>
          <p className="lead">Logic Test Score: <b>{candidate.logic_test_score}</b></p>
          <p className="lead">Job: <b>{candidate.job}</b></p>

          <hr className="my-4" />
          <h3>You won't be able to get it back again !</h3>
          <p className="lead text-center">
            <Link className="btn btn-left btn-primary btn-md" to="/" role="button">No</Link>
            <a  className="btn btn-right btn-primary btn-danger btn-md" user-uuid={candidate.uuid} href="#" onClick={this.removeCandidate.bind(this)} role="button">Yes</a>
          </p>
        </div>
      </div>
     </main>
        )

  }
}
export default RemoveWarning
