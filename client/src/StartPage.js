import React from 'react';

import ProjectAcordion from './components/StartPage/ProjectAcordion';
import './StartPage.css'


export default function StartPage() {
    const [tableData, setTableData] = React.useState(null);
    


    React.useEffect(() => {
        fetch("/api/projects")
        .then((res) => res.json())
        .then((tableData) => setTableData(tableData));
    }, []);


    return  <div>
                {!tableData || tableData.success 
                    ? <div className="NoUsers"><></></div>
                    : <ProjectAcordion data={tableData}/>
                }
            </div>
}