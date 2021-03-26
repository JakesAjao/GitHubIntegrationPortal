import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankcardComponent } from './blankcard.component';

describe('BlankcardComponent', () => {
  let component: BlankcardComponent;
  let fixture: ComponentFixture<BlankcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
