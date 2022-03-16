import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import './LogInForm.css'

class LogInForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: ''
        }
        this.redirect = false
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post("/api/users/login", this.state)
        .then(response => {
            console.log(response)
            if(response.data){
                fetch('/api/users/auth')
                .then((res) => res.json())
                .then(response => {
                    const [ ,setUser] = this.props.userSesion
                    setUser(response)
                }).then(this.redirect=true)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { username, password } = this.state
        return (
            <div>
                { this.redirect ? <Redirect to="/"/> : null }
                <form onSubmit={this.submitHandler}>
					<label>
					Name: <input type="text" name="username" value={username} onChange={this.changeHandler}/>
					</label><br></br>
					<label>
					Password: <input type="text" name="password" value={password} onChange={this.changeHandler}/>
					</label><br></br>
					<input type="submit" value="Submit" />
				</form>
            </div>
        );
    }
}

export default LogInForm;