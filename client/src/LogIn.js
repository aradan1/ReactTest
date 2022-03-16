import React from 'react';

import LogInForm from './components/LogIn/LogInForm';

import './LogIn.css'



export default function LogIn(props) {

	return  <div>
				<LogInForm userSesion={props.userSesion}/>
		  	</div>;
}