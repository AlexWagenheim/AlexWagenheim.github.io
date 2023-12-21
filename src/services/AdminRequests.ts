import {ResourceOwner} from "../entity/user/ResourceOwner";
import axios from "axios";

const serverUrl = process.env.REACT_APP_COMPILER_URL;

const ACCESS_TOKEN_KEY = "access_token";

export default class AdminRequests{
    static getAllUsers = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<ResourceOwner[]>(serverUrl + '/api/admin/users',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getUserById = async (userId: string) => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<ResourceOwner>(serverUrl + '/api/admin/users/' + userId,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static setUserStatus = async (userId: string, statusName: string) => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
        return await axios.post<ResourceOwner>(serverUrl + '/api/admin/users/' + userId + '/setStatus',
            {statusName},
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static setUserRole = async (userId: string, userRoles: string[]) => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.post<ResourceOwner>(serverUrl + '/api/admin/users/' + userId + '/setRoles',
            userRoles,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }
}