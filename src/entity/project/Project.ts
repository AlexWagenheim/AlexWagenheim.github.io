import {ProjectModule} from "./ProjectModule";

export class Project {
    name: string;
    createdDateTime: Date;
    lastUpdateDateTime: Date;
    modules: ProjectModule[];


    constructor(name: string, modules: ProjectModule[], createdDateTime: Date, lastUpdateDateTime: Date) {
        this.name = name;
        this.createdDateTime = createdDateTime;
        this.lastUpdateDateTime = lastUpdateDateTime;
        this.modules = modules;

    }

}