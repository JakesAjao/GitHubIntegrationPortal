import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankcardAcknowledgementComponent } from './blankcard-acknowledgement.component';

describe('BlankcardAcknowledgementComponent', () => {
  let component: BlankcardAcknowledgementComponent;
  let fixture: ComponentFixture<BlankcardAcknowledgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankcardAcknowledgementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankcardAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
