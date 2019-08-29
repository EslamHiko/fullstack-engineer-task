import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import '../assets/css/dashboard.css'

class NavList extends Component {

  render() {
    return (

        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
              <Link className="nav-link active" to="/">
              <span data-feather="users"></span>
              Candidates
              </Link>
              </li>
            </ul>
          </div>
        </nav>
        )

  }
}
export default NavList
