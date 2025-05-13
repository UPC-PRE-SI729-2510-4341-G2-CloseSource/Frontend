// import { Injectable } from '@angular/core';
// import { environment } from "../../../environments/environment";
// import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
// import { catchError, Observable, retry, throwError, map } from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BaseService<T> {
//   basePath: string = `${environment.serverBasePath}`;
//   resourceEndpoint: string = '/proposals';
//
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-type': 'application/json',
//     })
//   }
//
//   constructor(private http: HttpClient) { }
//
//   delete(id: number, endpoint: string): Observable<any> {
//     return this.http.delete(`${this.basePath}${endpoint}/${id}`, this.httpOptions)
//       .pipe(
//         map(() => ({ success: true, id })),
//         retry(2),
//         catchError(this.handleError)
//       );
//   }
//
//   handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       console.log(`An error occurred ${error.error.message}`);
//     } else {
//       console.log(`Backend returned code ${error.status}, body was ${error.error}`);
//     }
//     return throwError(() => new Error('Something happened with request, please try again later'));
//   }
// }
