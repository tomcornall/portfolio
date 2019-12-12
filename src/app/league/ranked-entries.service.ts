import { Injectable } from '@angular/core';
import { RankedEntry } from './ranked-entry';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankedEntriesService {
  private userUrl = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getRankedEntries(id: string): Observable<RankedEntry[]> {
    const url = this.userUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('endpoint', `/lol/league/v4/entries/by-summoner/${id}`)
        .set('token', 'RGAPI-05315f61-bd45-4418-aa8c-ae7a6bac14f7')
    };

    return this.http.get<RankedEntry[]>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched RankedEntry id=${id}`)),
      catchError(this.handleError<RankedEntry[]>(`getRankedEntry id=${id}`))
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
      console.log(`RankedEntriesService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
