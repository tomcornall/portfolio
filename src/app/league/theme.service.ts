import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightTheme = new Subject<boolean>();
  isLightTheme = this.lightTheme.asObservable();

  constructor() { }

  setLightTheme(isLightTheme: boolean): void {
    this.lightTheme.next(isLightTheme);
  }
}
