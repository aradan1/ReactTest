import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { Button } from '../Button'
import './Navbar.css'

class Navbar extends Component {
    constructor(props){
        super(props)

        this.state = { clicked: false }
    }
    
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    
    render() {
        const [user, ] = this.props.userSesion
        return (
            
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Mr.House<i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link className='nav-links' to='/'>
                        Home
                        </Link>
                    </li>
                    { !user
                        ? <><li>
                                <Link className='nav-links' to='/users/signup'>
                                Sign up
                                </Link>
                            </li>
                            <li>
                                <Link className='nav-links' to='/login'>
                                Log in
                                </Link>
                            </li>
                            <li>
                                <Link className='nav-links-mobile' to='/users/signup'>
                                Sign up
                                </Link>
                            </li></>
                        : <><li>
                                <Link className='nav-links' to={`/users/${user.userid}`}>
                                Profile
                                </Link>
                            </li>
                            <li>
                                <Link className='nav-links' to='/logout'>
                                Log out
                                </Link>
                            </li></>}
                </ul>
                <Button>Sign Up</Button>
            </nav>
        );
    }
}

export default Navbar;