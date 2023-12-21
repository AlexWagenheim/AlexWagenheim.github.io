export class WorkspaceCredentials {
    workspaceId: string | null;
    secret: string | null;

    constructor(workspaceId: string | null, secret: string | null) {
        this.workspaceId = workspaceId;
        this.secret = secret;
    }
}