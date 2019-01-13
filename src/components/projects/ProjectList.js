import React from 'react';
import { Link } from 'react-router-dom';

import ProjectSummary from './ProjectSummary'

const ProjectList = ({invoices}) => {
    return (
        <div className="project-list section">

            { invoices && invoices.map(invoice => {
                return (
                    <Link to={'/project/' + invoice.id} key={'link/'+invoice.id}>
                        <ProjectSummary invoice={invoice} key={invoice.id} />
                    </Link>
                )
            })}

        </div>
    );
}

export default ProjectList;