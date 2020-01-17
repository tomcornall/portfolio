import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

  toggleLightTheme(checked: boolean) {
    this.themeService.setLightTheme(checked);
  }

}
