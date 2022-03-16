import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import "./Usergrid.css"

class UserGrid extends Component {

    render() {
        return (
            <div className="grid">
                {this.props.data.success? <div /> : this.props.data.map((item, index) => {
                    return <Link className="item" key={index} to={`/users/${item.id}`}>
                            <div>
                                <h3>{item.username}</h3>
                                {item.email}
                            </div>
                        </Link>
                    
                })}
            </div>
        );
    }
}

export default UserGrid