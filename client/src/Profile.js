import React from 'react';
import { useParams } from 'react-router-dom'

import ProfileInfo from './components/ProfilePage/ProfileInfo'
import ProfileProjects from './components/ProfilePage/ProfileProjects'

import './Profile.css'


export default function Profile(props) {
    const { id } = useParams()
    const [userData, setuserData] = React.useState(null)
    const [userProjects, setuserProjects] = React.useState(null)


    React.useEffect(() => {
        fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((userData) => setuserData(userData))
    }, [id]);

    React.useEffect(() => {
        fetch(`/api/projects/user/${id}`)
        .then((res) => res.json())
        .then((userProjects) => setuserProjects(userProjects))
    }, [id]);

	return  <div className="user-page">
                {!userData ? <div/> :<ProfileInfo userData={userData}/>}
                {!userProjects ? <div/> : <ProfileProjects projectsData={userProjects}/>}
		  	</div>
}