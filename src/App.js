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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
            <Route path='/' component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            {/* <Route path='/signin' component={SignIn} /> */}
            <Route path='/signup' component={SignUp} />
            <Route path='/newinvoice' component={CreateProject} />
            {/*MODAL ROUTES*/}
            <ModalRoute
              path='/signin'
              component={SignIn}
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
