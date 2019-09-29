import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import ContactState from './context/contact/ContactState';

function App() {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar title="Contact Keeper" icon="fas fa-id-card-alt" />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>

  );
}

export default App;
