import React, {FC} from 'react';
import {ProjectInfo} from "../entity/project/ProjectInfo";
import Project from "./Project";
import LoaderProjects from "./LoaderProjects";

interface i_ProjectList{
    items: ProjectInfo[];
    isLoading: boolean;
    deleteProject: (projectId: string) => void;
}

const ProjectList: FC <i_ProjectList> = ({items, isLoading, deleteProject}) => {

    return (
        <div className={"project_area"}>
            {!isLoading ?
                items.map(item => <Project projectName={item.name}
                                           projectId={item.id}
                                           projectDateLUDT={new Date(item.lastUpdateDateTime).toLocaleDateString()
                                               + ' '+ new Date(item.lastUpdateDateTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                           key={item.id}
                                           deleteProject={deleteProject}/>)
                :
                <LoaderProjects/>
            }
        </div>
    );
};

export default ProjectList;