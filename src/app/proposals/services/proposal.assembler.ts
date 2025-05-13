import {ProposalResponse} from './proposal.response';
import {Proposal} from '../model/proposal.entity'

export class ProposalAssembler {

  static toEntityFromResponseArray(responseArray: ProposalResponse[]): Proposal[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }

  static toEntityFromResponse(response: ProposalResponse): Proposal {
    return {
      proposal_id: response.proposal_id,
      request_id: response.request_id,
      producer_id: response.producer_id,
      service_id: response.service_id,
      description: response.description,
      offered_price: response.offered_price,
      submission_date: response.submission_date,
      proposal_status: response.proposal_status
      } as Proposal;
  }
}
