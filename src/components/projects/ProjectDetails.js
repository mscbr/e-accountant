import React from 'react'

const ProjectDetails = (props) => {
    const id = props.match.params.id;
  return (
    <div className="container section project-details">
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">Invoice Title - {id}</span>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, ex quos. Officia repellendus quos hic impedit nemo autem vel pariatur placeat ut quae quaerat, voluptas eveniet perspiciatis necessitatibus eos reprehenderit?</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div>Posted by the Client</div>
                <div>2nd September, 02:00</div>
            </div>
        </div>
    </div>
  );
}

export default ProjectDetails
