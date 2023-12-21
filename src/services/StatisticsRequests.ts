import axios from "axios";
import {ProjectInfo} from "../entity/project/ProjectInfo";
import {CreateProjectRequest} from "../entity/project/dto/CreateProjectRequest";
import {ProjectPattern} from "../entity/project/dto/ProjectPattern";
import {SiteTrafficStatPoint} from "../entity/statistics/SiteTrafficStatPoint";
import {ProjectsStatPoint} from "../entity/statistics/ProjectsStatPoint";
import {CompilingDailyStatPoint} from "../entity/statistics/CompilingDailyStatPoint";
import {ExecutingDailyStatPoint} from "../entity/statistics/ExecutingDailyStatPoint";

const serverUrl = process.env.REACT_APP_COMPILER_URL;

const ACCESS_TOKEN_KEY = "access_token";

export default class StatisticsRequests{

    static getSiteTraffic = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<SiteTrafficStatPoint[]>(serverUrl + '/api/statistics/siteTraffic',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getTodayRegistrations = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<number>(serverUrl + '/api/statistics/registrations',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getTodayConnections = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<number>(serverUrl + '/api/statistics/connections',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getProjectsStatisticsForLastWeek = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<ProjectsStatPoint[]>(serverUrl + '/api/statistics/projects/weekStats',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getCompilingStatisticsForLastWeek = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<CompilingDailyStatPoint[]>(serverUrl + '/api/statistics/projects/compiling',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }

    static getExecutingStatisticsForLastWeek = async () => {

        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);

        return await axios.get<ExecutingDailyStatPoint[]>(serverUrl + '/api/statistics/projects/executing',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    }
}