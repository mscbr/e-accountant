import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import './index.css';


import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import Index from './components/auth/Index';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route path='/newinvoice' component={CreateProject} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/project/:id' component={ProjectDetails} />
            </Switch>
            {/* <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} /> */}
            <Route exact path='/' component={Index} />
            {/*MODAL ROUTES*/}
            <ModalRoute
              path='/signin'
              component={SignIn}
              parentPath='/dashboard'
              className='example-modal'
              inClassName='example-modal-in'
              outClassName='example-modal-out'
              backdropClassName='example-backdrop'
              backdropInClassName='example-backdrop-in'
              backdropOutClassName='example-backdrop-out'
              outDelay={300}
            />
            <ModalRoute
              path='/signup'
              component={SignUp}
              parentPath='/'
              className='example-modal'
              inClassName='example-modal-in'
              outClassName='example-modal-out'
              backdropClassName='example-backdrop'
              backdropInClassName='example-backdrop-in'
              backdropOutClassName='example-backdrop-out'
              outDelay={300}
            />
              
            <ModalContainer />
          
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
