import {ResourceOwner} from "../entity/user/ResourceOwner";
import axios from "axios";
import {ProjectInfo} from "../entity/project/ProjectInfo";
import {CreateProjectRequest} from "../entity/project/dto/CreateProjectRequest";
import {ProjectPattern} from "../entity/project/dto/ProjectPattern";

const serverUrl = process.env.REACT_APP_COMPILER_URL;

const ACCESS_TOKEN_KEY = "access_token";

export default class Requests{
    static getUserInfo = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        console.log('token = ' + token)

        return await axios.get<ResourceOwner>(serverUrl + '/api/userinfo',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static creatingProject = async (userId: string, projectName: string) => {

        console.log('userId ===' + userId)
        return await axios.post<string>(serverUrl + '/api/user/' + userId + '/project/create',
            new CreateProjectRequest(projectName, ProjectPattern.OBERON),
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN_KEY)
                }
            });
    }

    static getAllProject = async (userId: string) => {
        return await axios.get<ProjectInfo[]>(serverUrl + '/api/user/' + userId + '/project/all',
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN_KEY)
                }
            });
    }

    static deletingProject = async (userId: string, projectId: string) => {
        console.log("нечто")
        return await axios.delete<string>(serverUrl + '/api/user/' + userId + '/project/' + projectId,
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN_KEY)
                }
            });
    }
}