import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserOverviewComponent } from './league/user-overview/user-overview.component';
import { LeagueWrapperComponent } from './league/league-wrapper/league-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    UserOverviewComponent,
    LeagueWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
