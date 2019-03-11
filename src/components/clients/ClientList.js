import React, { Component } from 'react';
import ClientDetails from './ClientDetails'


const clientListStyle = {
    height: '100%',
    overflow: 'auto'
}
class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientPicked: false,
            adress: '',
            clientName: '',
            id: '',
            initials: '',
            isAcc: false,
            legalForm: '',
            nip: '',
            phoneNumber: '',
            regon: ''
        }
    }



    handleClientPick = (e, client) => {
        e.preventDefault();
        this.setState({
            ...client,
            clientPicked: true
        });
        
    }

    render() {
        const {clients} = this.props;
        return (
            <div style={clientListStyle}>
                <div className="row">
                    <div className="col s5" style={{marginTop: 15}}>
                        {clients.map(client => {
                            return (
                                <a key={client.id} href='#' className='black-text' onClick={(e) => this.handleClientPick(e, client)}>
                                    <div className="card client-list-item">
                                        <div className="card-content" style={{margin: 1, padding: 2}}>
                                            <span className="card-title">{client.clientName.substring(0,16)+'...'}</span>
                                            <p className="grey-text text-darken-1" >ID: {client.id}</p>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                    <div className="col s6">
                        { this.state.clientPicked ? <ClientDetails client={this.state} /> : <p style={{textAlign: 'center', color: 'red'}}>SELECT A CLIENT FOR DETAILS</p> }
                    </div>
                </div>
            </div>
        
        )
    }
    
}

export default ClientList;