import React from 'react';
import { Redirect } from 'react-router-dom'

import './LogOut.css'

export default function LogOut(props) {
	React.useEffect(() => {
		const [ , setUser] = props.userSesion
        fetch('/api/users/logout')
		.then(setUser(null))
    }, [props.userSesion]);

	return  <div>
				<Redirect to="/"/>
		  	</div>;
}