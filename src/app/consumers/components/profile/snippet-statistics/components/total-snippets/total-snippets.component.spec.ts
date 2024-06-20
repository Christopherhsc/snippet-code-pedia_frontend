import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSnippetsComponent } from './total-snippets.component';

describe('TotalSnippetsComponent', () => {
  let component: TotalSnippetsComponent;
  let fixture: ComponentFixture<TotalSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSnippetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
