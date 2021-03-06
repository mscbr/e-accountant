import React from 'react';

const ClientDetails = ({client}) => {
    
    return (
        <div className="container section">
            <div className="card z-depth-0" >
                <div className="card-content" >
                    <span className="card-title">{client.clientName}</span>
                    
                    <p className="grey-text">Adress: <span className="grey-text text-darken-2">{client.adress}</span></p>
                    <p className="grey-text">Legal form: <span className="grey-text text-darken-2">{client.legalForm}</span></p>
                    <p className="grey-text">NIP: <span className="grey-text text-darken-2">{client.nip}</span></p>
                    <p className="grey-text">REGON: <span className="grey-text text-darken-2">{client.regon}</span></p>
                    <p className="grey-text">Phone: <span className="grey-text text-darken-2">{client.phoneNumber}</span></p>
                    <p className="grey-text">Email: <span className="grey-text text-darken-2">{client.email}</span></p>
                    <p className="grey-text">User ID: <span className="grey-text text-darken-2">{client.id}</span></p>
                    
                </div>
            </div>      
        </div>
    );
}

export default ClientDetails