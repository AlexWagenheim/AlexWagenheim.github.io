export class ExecutingDailyStatPoint {
    dayOfWeek: number;
    executions: number;


    constructor(dayOfWeek: number, executions: number) {
        this.dayOfWeek = dayOfWeek;
        this.executions = executions;
    }
}