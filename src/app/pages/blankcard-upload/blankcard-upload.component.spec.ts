import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankcardUploadComponent } from './blankcard-upload.component';

describe('BlankcardUploadComponent', () => {
  let component: BlankcardUploadComponent;
  let fixture: ComponentFixture<BlankcardUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankcardUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankcardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
