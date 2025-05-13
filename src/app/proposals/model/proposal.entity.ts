export class Proposal {
    proposal_id: number;
    request_id: number;
    producer_id: number;
    service_id: number;
    description: string;
    offered_price: number;
    submission_date: string;
    proposal_status: 'pending' | 'accepted' | 'denegate';

    constructor() {
        this.proposal_id = 0;
        this.request_id = 0;
        this.producer_id = 0;
        this.service_id = 0;
        this.description = '';
        this.offered_price = 0.0;
        this.submission_date = '';
        this.proposal_status = 'pending';
    }
}
