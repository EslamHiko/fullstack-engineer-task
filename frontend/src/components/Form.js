import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import SuccessMsg from './SuccessMsg'
import '../assets/css/dashboard.css'
import 'jquery'
class Form extends Component {
  constructor(props){
    super(props);
    var candidate = {};
    if(this.props.match){
      candidate = this.props.candidates.filter((candidate)=>{
        return candidate.uuid == this.props.match.params.uuid
      })[0]
    }
    this.state = {candidate:candidate,loading:false}
  }

  createOrUpdate(e){
    event.preventDefault();
    let data = [];
    // storing form inputs in key-value storage for fast access
    for(let input of e.target.elements){
      let name = input.getAttribute('name')
      let value = input.value
      data[name] = value
    }

    let query = `mutation {
  CreateOrUpdateCandidate(${data['uuid'] ? `uuid:${data['uuid']},`:''} firstName:"${data['first_name']}",
    lastName:"${data['last_name']}",logicTestScore:${data['logic_test_score']},job:"${data['job']}",email:"${data['email']}")
  {
    candidate{
      uuid,
      email,
      firstName,
      lastName,
      logicTestScore,
      job
    }
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
        this.setState({loading:false,success:true})
        // this setTimeout to hide the success massage
        setTimeout(()=>{
          this.setState({success:false})
        },3000)
      }
    );
  }
  /**
   * function to handle input changes
   */
  handleChange(e){
    const attr = e.target.getAttribute('name')
    let candidate = this.state.candidate
    candidate[attr] = e.target.value
    this.setState({candidate:candidate})
  }
  render() {
    const candidate = this.state ? this.state.candidate : {}

    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <SuccessMsg candidate={candidate} success={this.state.success} />
        <form onSubmit={this.createOrUpdate.bind(this)}>
          {candidate.uuid && (<input type="hidden" name="uuid" value={candidate.uuid} />)}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" required value={candidate ? (candidate.email) : ''} onChange={this.handleChange.bind(this)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail2">First Name</label>
            <input type="text" name="first_name" className="form-control" required value={candidate ? (candidate.first_name) : ''} onChange={this.handleChange.bind(this)} id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter First Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail13">Last Name</label>
            <input type="text" name="last_name" className="form-control" required value={candidate ? (candidate.last_name) : ''} onChange={this.handleChange.bind(this)} id="exampleInputEmail13" aria-describedby="emailHelp" placeholder="Enter Last Name"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword13">Logic Test Score</label>
            <input type="number" name="logic_test_score" min="0" max="10" required value={candidate ? (candidate.logic_test_score) : ''} onChange={this.handleChange.bind(this)} className="form-control" id="exampleInputPassword13" placeholder="Test Score"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail31">Job</label>
            <input type="text" name="job" className="form-control" required value={candidate ? (candidate.job) : ''} onChange={this.handleChange.bind(this)} id="exampleInputEmail31" aria-describedby="emailHelp" placeholder="Enter Job"/>
          </div>
          <button type="submit" disabled={this.state.loading} className="btn btn-primary">save</button>
        </form>
      </main>
    )
  }
}

export default Form
