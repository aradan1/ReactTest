import React, { Component } from 'react';

import logo from '../logo.svg'

import './ProfileInfo.css'

class ProfileInfo extends Component {

    render() {
        return (
            <div className="Sidebar">
                <img src={logo} className="Profile-image" alt="logo" />
                <div>
                    <h2>{this.props.userData.username}</h2>
                    <h4>{this.props.userData.email}</h4>
                    <h2>{this.props.userData.description}</h2>
                </div>
            </div>
        );
    }
}

export default ProfileInfo;