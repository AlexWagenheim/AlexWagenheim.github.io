import {ProjectModule} from "../ProjectModule";
import {WorkspaceCredentials} from "../../WorkspaceCredentials";

export class UpdateProjectRequest {
    credentials: WorkspaceCredentials;
    name: string;
    modules: ProjectModule[];
    createSavePoint: boolean;

    constructor(credentials: WorkspaceCredentials, name: string, modules: ProjectModule[], createSavePoint: boolean) {
        this.credentials = credentials;
        this.name = name;
        this.modules = modules;
        this.createSavePoint = createSavePoint;
    }
}