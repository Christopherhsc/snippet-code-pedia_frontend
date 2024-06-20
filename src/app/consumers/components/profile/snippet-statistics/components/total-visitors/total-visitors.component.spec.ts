import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVisitorsComponent } from './total-visitors.component';

describe('TotalVisitorsComponent', () => {
  let component: TotalVisitorsComponent;
  let fixture: ComponentFixture<TotalVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalVisitorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
