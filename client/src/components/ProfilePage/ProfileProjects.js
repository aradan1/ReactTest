import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ProfileProjects.css'

class ProfileProjects extends Component {

    render() {
        return (
            <div className="Project-display">
                {this.props.projectsData.success ? 
                    <div className="NoProject"><h1>Private User</h1></div> :
                    
                    this.props.projectsData.map((item, index) => {
                        return <Link className="Project" key={index} to={`/projects/${item.id}`}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>{item.content}</p>
                            </Link>
                        
                })}
            </div>
        );
    }
}

export default ProfileProjects;