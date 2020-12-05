import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./Chat/Chat";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/chatbox">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
