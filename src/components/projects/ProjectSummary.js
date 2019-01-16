import React from 'react';


const ProjectSummary = ({invoice}) => {
    return (
        <div className="card z-depth-1 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{invoice.title}</span>
                <p>Posted by the {invoice.firstName} {invoice.lastName}</p>
                <p className="grey-text">{invoice.date}</p>
            </div>
        </div>
    );
}

export default ProjectSummary;