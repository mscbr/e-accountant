import React from 'react';
import moment from 'moment';


const InvoiceSummary = ({invoice}) => {
    return (
        <div className="card z-depth-1 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{invoice.title}</span>
                <p>Opublikowane przez {invoice.clientName}</p>
                <p className="grey-text text-darken-1">
                    Typ: <span className="red-text text-lighten-1">{invoice.docType} invoice </span>
                </p>
                <p className="grey-text text-darken-1">
                    Rozliczone: <span className="black-text text-lighten-1">{invoice.settled ? <i className='tiny material-icons'>check</i> : <i className='tiny material-icons'>clear</i>}</span>
                </p>
                <p className="grey-text">{moment(invoice.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
}

export default InvoiceSummary; 