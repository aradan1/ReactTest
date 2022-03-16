import React from 'react';
import { useParams } from 'react-router-dom'

import ProjectInfo from './components/ProjectPage/ProjectInfo'
import ProjectContent from './components/ProjectPage/ProjectContent'

import './ProjectPage.css'


export default function ProjectPage(props) {
    const { id } = useParams()
    const [projectData, setprojectData] = React.useState(null)


    React.useEffect(() => {
        fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((projectData) => setprojectData(projectData))
    }, [id]);

	return  <div>
                {!projectData ? <div className="project-page"/> :
                <div className="project-page">
                    <ProjectInfo projectData={projectData}/>
                    <ProjectContent contentData={projectData.content}/>
                </div>}
		  	</div>
}