import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';



import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import AccountantPanel from './components/dashboard/AccountantPanel';
import InvoiceDetails from './components/projects/InvoiceDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NewDocument from './components/projects/NewDocument';
import NewSettlement from './components/projects/NewSettlement';

import Entry from './components/auth/Entry';
import UpdateDocument from './components/projects/UpdateDocument';
import AccountDetails from './components/auth/AccountDetails';
import AccountUpdate from './components/auth/AccountUpdate';
import SettlementDetails from './components/projects/SettlementDetails';
import Clients from './components/clients/Clients';



class App extends Component {
  
 
  render() {
  
    return (
      
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route path='/newdocument' component={NewDocument} />
              <Route path='/project/update/:id' component={UpdateDocument} />
              <Route path='/newsettlement' component={NewSettlement} />
              <Route path='/settlement/:id' component={SettlementDetails} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/accpanel' component={AccountantPanel} />
              <Route path='/project/:id' component={InvoiceDetails} />
              <Route path='/accountdetails/:uid' component={AccountDetails} />
              <Route path='/update/accountdetails/:uid' component={AccountUpdate} />
              
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              
              <Route path='/clients' component={Clients} />

              <Route exact path='/' component={Entry} />
            </Switch>
            
          
        </div>
      </BrowserRouter>
    ); 
  }
}

export default App;
