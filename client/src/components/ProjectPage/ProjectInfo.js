import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ProjectInfo.css'

class ProjectInfo extends Component {

    render() {
        return (
            <div className="Sidebar">
                <div>
                    <h2>{this.props.projectData.title}</h2>
                    <Link className="LinkItem" to={`/users/${this.props.projectData.authorId}`}>{this.props.projectData.ownername}</Link>
                    <h4>{this.props.projectData.description}</h4>
                </div>
            </div>
        );
    }
}

export default ProjectInfo;