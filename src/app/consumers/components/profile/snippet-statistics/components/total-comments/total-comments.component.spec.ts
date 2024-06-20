import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCommentsComponent } from './total-comments.component';

describe('TotalCommentsComponent', () => {
  let component: TotalCommentsComponent;
  let fixture: ComponentFixture<TotalCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
