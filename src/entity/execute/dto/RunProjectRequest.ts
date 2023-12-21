import {ProjectRunMode} from "./ProjectRunMode";
import {WorkspaceCredentials} from "../../WorkspaceCredentials";

export class RunProjectRequest {
    credentials: WorkspaceCredentials;
    mode: ProjectRunMode;
    input: string;

    constructor(credentials: WorkspaceCredentials, mode: ProjectRunMode, input: string) {
        this.credentials = credentials;
        this.mode = mode;
        this.input = input;
    }
};