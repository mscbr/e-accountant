import React from 'react';
import { Link } from 'react-router-dom';

import ProjectSummary from './ProjectSummary'

const ProjectList = ({invoices}) => {
    // const profile = getState().firebase.profile;
    // console.log(profile);
    return (
        <div className="project-list section">

            { invoices && invoices.map(invoice => {
                return (
                    <Link to={'/project/' + invoice.id} key={invoice.id}>
                        <ProjectSummary invoice={invoice}  />
                    </Link>
                )
            })}

        </div>
    );
}

export default ProjectList;