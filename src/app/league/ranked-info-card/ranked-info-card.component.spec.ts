import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedInfoCardComponent } from './ranked-info-card.component';

describe('RankedInfoCardComponent', () => {
  let component: RankedInfoCardComponent;
  let fixture: ComponentFixture<RankedInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankedInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankedInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
