import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// pages
import {
  Home,
  Login,
  Dashboard
} from "../pages";


const Routing = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/mis105/SILAB">
            <Home />
          </Route>
          <Route path="/mis105/SILAB/login">
            <Login />
          </Route>
          <Route path="/mis105/SILAB/dashboard">
            <Dashboard />
          </Route>
      </Switch>
    </Router>
  )
}

export default Routing