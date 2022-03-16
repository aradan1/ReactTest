import React, { Component } from 'react';

import './ProjectContent.css'

class ProjectContent extends Component {

    render() {
        return (
            <div className="Content">
                <h2>{this.props.contentData}</h2>
            </div>
        );
    }
}

export default ProjectContent;