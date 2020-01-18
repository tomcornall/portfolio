import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './league/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.themeService.isLightTheme.subscribe(value => {
        if (value) {
          this.elementRef.nativeElement.classList.add('light-theme');
        } else {
          this.elementRef.nativeElement.classList.remove('light-theme');
        }
      }
    )
  }
}
