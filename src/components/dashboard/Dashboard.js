import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

class Dashboard extends Component {
    
    render() {
        
        return (
            <div className="dashboard container">
            
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invoices: state.invoice.invoices
    }
}

export default connect(mapStateToProps)(Dashboard);