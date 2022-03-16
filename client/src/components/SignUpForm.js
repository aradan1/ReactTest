import React, { Component } from 'react'
import axios from 'axios'

class SignUpForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post("/api/users/signup", this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { username, password, email } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
					<label>
					Name: <input type="text" name="username" value={username} onChange={this.changeHandler}/>
					</label><br></br>
					<label>
					Password: <input type="text" name="password" value={password} onChange={this.changeHandler}/>
					</label><br></br>
					<label>
					email: <input type="text" name="email" value={email} onChange={this.changeHandler}/>
					</label><br></br>
					<input type="submit" value="Submit" />
				</form>
            </div>
        );
    }
}

export default SignUpForm;