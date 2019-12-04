import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://na1.api.riotgames.com';  // URL to web api
  apiKey = 'RGAPI-8d77c9cc-5dcd-40aa-8ff9-6bc27d272c45';
  userEndpoint = '/lol/summoner/v4/summoners/by-name/KingOfTryndamere'; // append summoner name

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Riot-Token': this.apiKey,
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getUser(username: string): Observable<User> {
    const url = this.userUrl+this.userEndpoint;
    console.log('GOT USER');
    console.log(this.http);

    return this.http.get<User>(url, this.httpOptions).pipe(
/*       // tap(_ => this.log(`fetched User username=${username}`)),
      // catchError(this.handleError<User>(`getUser username=${username}`)) */
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`UserService: ${message}`);
  }
}
