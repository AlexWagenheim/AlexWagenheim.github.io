import {WorkspaceCredentials} from "../../WorkspaceCredentials";

export class CompileProjectRequest {
    credentials: WorkspaceCredentials;
    modules: string[];

    constructor(credentials: WorkspaceCredentials, modules: string[]) {
        this.credentials = credentials;
        this.modules = modules;
    }
}