export class CompilingDailyStatPoint {
    dayOfWeek: number;
    compilations: number;


    constructor(dayOfWeek: number, compilations: number) {
        this.dayOfWeek = dayOfWeek;
        this.compilations = compilations;
    }
}