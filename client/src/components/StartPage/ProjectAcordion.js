import React from 'react';
import { Link } from 'react-router-dom';
import Collapsible from '../Collapsible';

import './ProjectAcordion.css'

export default function ProjectAcordion(props) {
    const [collapse, setCollapse] = React.useState();

    const toggleCollapse = (index) => {
        if (!collapse || index !== collapse) {
            setCollapse(index)
        } else if (collapse === index) {
            setCollapse(false)
        }
    }


    /*
    Project object structure:
        "id"
        "title"
        "content"
        "description"
        "createdAt"
        "updatedAt"
        "authorId"
        "ownerName"
    */
    return (
        <div>
            {props.data 
            ? props.data.map((item, index) => {
                return <div className="acordion" onClick={() => toggleCollapse(index)} key={index}>
                    <Collapsible isOpen={collapse === index}>
                        <div className="acordion-header"  to={`/users/${item.id}`}>
                            <div className="vertical-divider">
                                <Link className="itemLink" to={`/projects/${item.id}`}><h3>{item.title}</h3></Link>
                                <Link className="itemLink" to={`/users/${item.authorId}`}><h4>{item.ownerName}</h4></Link>
                            </div>
                            <div>
                                <p>{item.description}</p>
                            </div>
                        </div>

                        <div className="accordion-body">{item.content}</div>
                    </Collapsible>
                </div>
            })
            : <div />}
        </div>
    );
}