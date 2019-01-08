import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';



import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SendInvoice from './components/projects/SendInvoice';
import CreateInvoice from './components/projects/CreateInvoice';
import Entry from './components/auth/Entry';
import NewInvoice from './components/projects/NewInvoice';

class App extends Component {
  constructor(props) {
    super(props);
   
  }
 
  render() {
  
    return (
      
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route path='/newinvoice/send' component={SendInvoice} />
              <Route path='/newinvoice/create' component={CreateInvoice} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/project/:id' component={ProjectDetails} />
            
              
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/newinvoice'  component={NewInvoice}/>
              <Route exact path='/' component={Entry} />
            </Switch>
            
          
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
