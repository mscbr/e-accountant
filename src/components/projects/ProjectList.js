import React from 'react';

import ProjectSummary from './ProjectSummary'

const ProjectList = ({invoices}) => {
    return (
        <div className="project-list section">

            { invoices && invoices.map(invoice => {
                return (
                    <ProjectSummary invoice={invoice} key={invoice.id} />
                )
            })}

        </div>
    );
}

export default ProjectList;