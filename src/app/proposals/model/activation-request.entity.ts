import { EventFilter } from './event-filter.entity';

export class ActivationRequest {
    request_id: number;
    company_id: number;
    event_title: string;
    event_description: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    event_filters: EventFilter[];

    constructor() {
        this.request_id = 0;
        this.company_id = 0;
        this.event_title = '';
        this.event_description = '';
        this.location = '';
        this.start_date = '';
        this.end_date = '';
        this.status = '';
        this.event_filters = [];
    }
}
