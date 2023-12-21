export class SiteTrafficStatPoint {
    date: string;
    time: string;
    connections: number;

    constructor(date: string, time: string, connections: number) {
        this.date = date;
        this.time = time;
        this.connections = connections;
    }
}