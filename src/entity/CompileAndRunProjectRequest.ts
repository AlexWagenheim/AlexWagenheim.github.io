import { ProjectRunMode } from "./execute/dto/ProjectRunMode";
import {ProjectModule} from "./project/ProjectModule";
import {WorkspaceCredentials} from "./WorkspaceCredentials";

export class CompileAndRunProjectRequest {
    credentials: WorkspaceCredentials;
    name: string;
    secret: string;
    mode: ProjectRunMode;
    input: string;
    modules: ProjectModule[];

    constructor(credentials: WorkspaceCredentials, name: string, secret: string, mode: ProjectRunMode, input: string,  modules: ProjectModule[]) {
        this.credentials = credentials;
        this.name = name;
        this.secret = secret;
        this.mode = mode;
        this.input = input;
        this.modules = modules;
    }
}