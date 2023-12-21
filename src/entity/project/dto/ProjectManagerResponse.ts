import {ProjectManagerResponseStatus} from "./ProjectManagerResponseStatus";
import {WebSocketErrorField} from "../../WebSocketErrorField";
import {Project} from "../Project";

export interface ProjectManagerResponse {
    status: ProjectManagerResponseStatus;
    message: string;
    project: Project;
    errors: WebSocketErrorField[];
}