export interface ProposalResponse {
    proposal_id: number;
    request_id: number;
    producer_id: number;
    service_id: number;
    description: string;
    offered_price: number;
    submission_date: string;
    proposal_status: 'pending' | 'accepted' |'denied|';
}
