import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: string): Observable<User> {
    const url = this.userUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('endpoint', `/lol/league/v4/entries/by-summoner/${id}`)
        .set('token', 'RGAPI-9b4c2b3c-2ff7-46cb-b414-e09e6c38cdf2')
    };

    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`UserService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
