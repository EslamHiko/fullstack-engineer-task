import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'
import NavList from './NavList'
import App from './App'
import Form from './Form'
import RemoveWarning from './RemoveWarning'


class Container extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <NavList />
          <Route path="/" exact={true} render={() => <App original={this.props.original} jobs={this.props.jobs} refreshCandidates={this.props.refreshCandidates} msg={this.props.msg} candidates={this.props.candidates} />}/>
          <Route path="/add-candidate" render={() => <Form refreshCandidates={this.props.refreshCandidates} />}/>
          <Route path="/edit/:uuid" render={(props) => <Form {...props} refreshCandidates={this.props.refreshCandidates} candidates={this.props.candidates} />}/>
          <Route path="/remove/:uuid" render={(props) => <RemoveWarning {...props} refreshCandidates={this.props.refreshCandidates} candidates={this.props.candidates}  />}/>
        </div>
      </div>
    )
  }
}
export default Container
