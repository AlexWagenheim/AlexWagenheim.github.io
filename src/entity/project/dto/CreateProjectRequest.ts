import {ProjectPattern} from "./ProjectPattern";

export class CreateProjectRequest {
    name: string;
    projectPattern: ProjectPattern;

    constructor(name: string, projectPattern: ProjectPattern) {
        this.name = name;
        this.projectPattern = projectPattern;
    }
}