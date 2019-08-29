import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/NavBar'
import NavList from './components/NavList'
import App from './components/App'
import Container from './components/Container'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './assets/css/dashboard.css'


class Index extends Component {

constructor(props) {
  super(props);
  this.state = { candidates: [],msg: 'loading....',jobs:[]};
  this.refreshCandidates();
}
/**
 * Function to load candidates
 */
refreshCandidates(candidates){
  if(candidates){
    // updating candidates locally from the filter
    this.setState({candidates:candidates});
  } else {
    fetch("http://localhost:5000/").then(response=>{
      response.json().then(result=>{
        var jobs
        if(!this.state.jobs.length){
          jobs = result.candidates.map((candidate) => candidate.job);
          jobs = [...new Set(jobs)]
          this.setState({jobs:jobs})
        }
        this.setState({original:result.candidates,candidates:result.candidates,msg:''});
      })
    });
  }
}
/**
 * Function to search candidates
 */
seachCandidates(e,property){
  var candidates = this.state.original
  candidates = candidates.filter(candidate=>{
    for(let property in candidate){
      if(String(candidate[property]).toLowerCase().search(e.target.value.toLowerCase()) !== -1){
        if($('select')[0].value != 'All Candidates') // if the filter is on add the job as a secondary filter
            return candidate['job'] == $('select')[0].value
        else
          return true
      }
    }
    return false;
  })

  this.setState({candidates:candidates})
}

render(){

    return (
      <Router>
      [<NavBar key={0} seachCandidates={this.seachCandidates.bind(this)} />,
      <Container key={1} original={this.state.original} jobs={this.state.jobs} refreshCandidates={this.refreshCandidates.bind(this)} msg={this.state.msg} candidates={this.state.candidates} />]
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))
