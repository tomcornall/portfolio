import { Injectable } from '@angular/core';
import { Account } from './account';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // TODO: MOVE to a different service.
  private apiUrl = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';  // URL to web api
  // end todo... 

  constructor(
    private http: HttpClient
  ) { }

  getAccount(summonerName: string): Observable<Account> {
    const url = this.apiUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('endpoint', `/lol/summoner/v4/summoners/by-name/${summonerName}`)
        .set('token', 'RGAPI-612d9fd8-3f63-46a1-9e70-9126347257b4')
    };

    return this.http.get<Account>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched Account summonerName=${summonerName}`)),
      catchError(this.handleError<Account>(`getAccount summonerName=${summonerName}`))
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

      // TODO: better job of transforming error for account consumption
      console.log(`AccountService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
