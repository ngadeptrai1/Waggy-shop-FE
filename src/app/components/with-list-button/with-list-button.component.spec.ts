import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithListButtonComponent } from './with-list-button.component';

describe('WithListButtonComponent', () => {
  let component: WithListButtonComponent;
  let fixture: ComponentFixture<WithListButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithListButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
