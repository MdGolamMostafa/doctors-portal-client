import React from 'react';
import {
        BrowserRouter as Router,
        Switch,
        Route
  } from "react-router-dom";
import Appointment from './Components/Appointment/Appointment/Appointment';
import Home from './Components/Home/Home/Home';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <Home></Home>
        </Route>
        <Route path = "/appointment">
          <Appointment></Appointment>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;