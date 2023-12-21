import {WorkspaceCredentials} from "../../WorkspaceCredentials";

export class OpenProjectWebSocketRequest {
    projectId: string;
    credentials: WorkspaceCredentials;

    constructor(projectId: string, credentials: WorkspaceCredentials) {
        this.projectId = projectId;
        this.credentials = credentials;
    }
}