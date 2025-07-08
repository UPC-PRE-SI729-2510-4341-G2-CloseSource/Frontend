import { ProposalStatus } from './proposal-status.enum';

export interface ActivationPlan {
  objective: string;
  concept: string;
  branding: string;
  activation: string;
  resources: string;
  kpi: string;
}

export interface Proposal {
  proposalId: number;
  requestId: number;
  producerId: number;
  name: string;
  activationPlan: ActivationPlan;
  offeredPrice: number;
  submissionDate: string;
  proposalStatus: ProposalStatus;
}
