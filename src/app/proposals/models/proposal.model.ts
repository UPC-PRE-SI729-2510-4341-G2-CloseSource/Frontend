import { ProposalStatus } from './proposal-status.enum';

export interface Proposal {
  proposalId: number;
  requestId: number;
  producerId: number;
  serviceId: number;
  name: string;
  description: string;
  offeredPrice: number;
  submissionDate: string;
  proposalStatus: ProposalStatus;
}
