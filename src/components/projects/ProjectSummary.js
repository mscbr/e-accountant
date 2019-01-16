import React from 'react';
import moment from 'moment';


const ProjectSummary = ({invoice}) => {
    return (
        <div className="card z-depth-1 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{invoice.title}</span>
                <p>Posted by the {invoice.firstName} {invoice.lastName}</p>
                <p className="grey-text">{moment(invoice.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
}

export default ProjectSummary; 