import React from 'react';
import moment from 'moment';


const SettlementSummary = ({invoice}) => {
    return (
        <div className="card z-depth-1 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{invoice.title}</span>
                {/* pass the clientName from clientId */}
                <p>Dla: {invoice.clientId}</p>
                <p className="grey-text text-darken-1">
                    Okres: <span className="red-text text-lighten-1">{invoice.issuePeriod}</span>
                </p>
                <p className="grey-text">{moment(invoice.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
}

export default SettlementSummary; 