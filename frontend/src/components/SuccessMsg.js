import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'

class SuccessMsg extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h3 >{this.props.candidate ? 'Edit' : 'Add'} Candidate</h3>
        </div>
        <div className={['alert','alert-msg', 'alert-success',(this.props.success ? 'show' : '')].join(" ")} role="alert">
          <h4 className="alert-heading">Candidate Has Been Saved Successfully!</h4>
        </div>
      </div>
    )
  }
}
export default SuccessMsg
