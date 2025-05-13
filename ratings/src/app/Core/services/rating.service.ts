import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rating, IRating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:3000/ratings';

  constructor(private http: HttpClient) {}

  /** Devuelve instancias de Rating (clase) */
  getAllRatings(): Observable<Rating[]> {
    return this.http.get<IRating[]>(this.apiUrl).pipe(
      map(list => list.map(r => new Rating(
        r.rating_id,
        r.event_id,
        r.issuer_id,
        r.receiver_id,
        r.score,
        r.comment
      )))
    );
  }

  getRatingById(id: number): Observable<Rating> {
    return this.http.get<IRating>(`${this.apiUrl}/${id}`).pipe(
      map(r => new Rating(
        r.rating_id,
        r.event_id,
        r.issuer_id,
        r.receiver_id,
        r.score,
        r.comment
      ))
    );
  }
}



