import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Alva labs.io</Link>
        <input className="form-control form-control-dark w-100" onKeyUp={this.props.seachCandidates.bind(this)} type="text" placeholder="Search" aria-label="Search"/>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/add-candidate/">
              Add Candidate<span data-feather="plus"></span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
export default NavBar
