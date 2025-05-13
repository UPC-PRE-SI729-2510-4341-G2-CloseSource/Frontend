export class EventFilter {
    filter_id: number;
    type: string;
    filter_name: string;

    constructor(filter_id: number, type: string, filter_name: string) {
        this.filter_id = filter_id;
        this.type = type;
        this.filter_name = filter_name;
    }
}

