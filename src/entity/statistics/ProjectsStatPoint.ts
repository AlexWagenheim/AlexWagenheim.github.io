export class ProjectsStatPoint {
    dayOfWeek: number;
    creations: number;
    deletions: number;


    constructor(dayOfWeek: number, creations: number, deletions: number) {
        this.dayOfWeek = dayOfWeek;
        this.creations = creations;
        this.deletions = deletions;
    }
}