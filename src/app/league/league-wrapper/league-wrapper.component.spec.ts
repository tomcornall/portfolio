import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueWrapperComponent } from './league-wrapper.component';

describe('LeagueWrapperComponent', () => {
  let component: LeagueWrapperComponent;
  let fixture: ComponentFixture<LeagueWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
