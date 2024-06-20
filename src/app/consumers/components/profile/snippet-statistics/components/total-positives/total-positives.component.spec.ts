import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPositivesComponent } from './total-positives.component';

describe('TotalPositivesComponent', () => {
  let component: TotalPositivesComponent;
  let fixture: ComponentFixture<TotalPositivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPositivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalPositivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
