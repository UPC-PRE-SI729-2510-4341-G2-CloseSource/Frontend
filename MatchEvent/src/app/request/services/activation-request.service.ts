// request/services/activation-request.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivationRequest, EventDateRange, MaterialRequirement, AudienceProfile, ActivationLocation } from '../model/activation-request.entity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivationRequestService {
  private baseUrl = `${environment.serverBasePath}/activation-requests`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActivationRequest[]> {
    return this.http.get<ActivationRequest[]>(this.baseUrl);
  }

  getById(id: number): Observable<ActivationRequest> {
    return this.http.get<ActivationRequest>(`${this.baseUrl}/${id}`);
  }

  create(request: ActivationRequest): Observable<ActivationRequest> {
    return this.http.post<ActivationRequest>(this.baseUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 👇 NUEVOS MÉTODOS AÑADIDOS

  updateLocation(id: number, location: ActivationLocation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/location`, location);
  }

  updateEventDateRange(id: number, eventDate: EventDateRange): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/event-date-range`, eventDate);
  }

  addMaterial(id: number, material: MaterialRequirement): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/materials`, material);
  }

  addAudienceProfile(id: number, profile: AudienceProfile): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/audience-profiles`, profile);
  }
}
