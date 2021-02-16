import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchcardComponent } from './dispatchcard.component';

describe('DispatchcardComponent', () => {
  let component: DispatchcardComponent;
  let fixture: ComponentFixture<DispatchcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
