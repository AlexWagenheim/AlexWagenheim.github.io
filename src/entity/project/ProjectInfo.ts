import {ProjectPattern} from "./dto/ProjectPattern";

export class ProjectInfo {
    id: string;
    name: string;
    createdDateTime: Date;
    lastUpdateDateTime: Date;
    pattern: ProjectPattern;

    constructor(id: string, name: string, createdDateTime: Date, lastUpdateDateTime: Date, pattern: ProjectPattern) {
        this.id = id;
        this.name = name;
        this.createdDateTime = createdDateTime;
        this.lastUpdateDateTime = lastUpdateDateTime;
        this.pattern = pattern;
    }
}