import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';



import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import InvoiceDetails from './components/projects/InvoiceDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NewDocument from './components/projects/NewDocument';

import Entry from './components/auth/Entry';


class App extends Component {
  
 
  render() {
  
    return (
      
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route path='/newdocument' component={NewDocument} />
              
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/project/:id' component={InvoiceDetails} />
            
              
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              {/* <Route path='/newinvoice'  component={NewInvoice}/> */}
              <Route exact path='/' component={Entry} />
            </Switch>
            
          
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
