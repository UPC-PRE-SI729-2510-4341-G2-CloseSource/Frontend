import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proposal } from '../model/proposal.entity';
import { ProposalResponse } from './proposal.response';
import { ProposalAssembler } from './proposal.assembler';
import { Service } from '../model/service.entity'
import { ServiceResponse } from './service.response';
import { ServiceAssembler } from './service.assembler';
import { ActivationRequest } from '../model/activation-request.entity';
import { ActivationRequestResponse } from './activation-request.response';
import { ActivationRequestAssembler } from './activation-request.assembler';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatcheventApiService {

  private baseUrl = environment.matcheventProviderApiBaseUrl
  private proposalsEndpoint = environment.matcheventProviderProposalsEndpointPath;
  private servicesEndpoint = environment.matcheventProviderServicesEndpointPath;
  private activationRequestsEndpoint = environment.matcheventProviderActivationRequestEndpointPath;

  constructor(private http: HttpClient) { }

  getProposals(): Observable<Proposal[]> {
    return this.http.get<ProposalResponse[]>(`${this.baseUrl}${this.proposalsEndpoint}`)
      .pipe(
        map(responseArray =>
          ProposalAssembler.toEntityFromResponseArray(responseArray))
    );
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<ServiceResponse[]>(`${this.baseUrl}${this.servicesEndpoint}`)
      .pipe(
        map(responses => ServiceAssembler.toEntityList(responses))
      );
  }

  deleteProposal(proposalId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.proposalsEndpoint}/${proposalId}`);
  }

  updateProposal(proposal: Proposal): Observable<any> {
    return this.http.put(`${this.baseUrl}${this.proposalsEndpoint}/${proposal.proposal_id}`, proposal);
  }

  getActivationRequests(): Observable<ActivationRequest[]> {
    return this.http.get<ActivationRequestResponse[]>(`${this.baseUrl}${this.activationRequestsEndpoint}`)
      .pipe(
        map(response => response.map(item => ActivationRequestAssembler.fromJson(item)))
      );
  }
  getServiceById(id: number): Observable<Service> {
    return this.http.get<ServiceResponse[]>(`${this.baseUrl}${this.servicesEndpoint}/${id}`)
      .pipe(
        map(response => ServiceAssembler.toEntity(response[0]))
      );
  }

  getActivationRequestById(id: number): Observable<ActivationRequest> {
    return this.http.get<ActivationRequestResponse[]>(
      `${this.baseUrl}${this.activationRequestsEndpoint}/${id}`
    ).pipe(
      map(response => ActivationRequestAssembler.fromJson(response[0]))
    );
  }
}
