import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = `${environment.matcheventApiBaseUrl}/proposals`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.apiUrl}/${id}`);
  }

  create(proposal: Proposal): Observable<Proposal> {
    return this.http.post<Proposal>(this.apiUrl, proposal);
  }

  update(id: number, proposal: Proposal): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.apiUrl}/${id}`, proposal);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
