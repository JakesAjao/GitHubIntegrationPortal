import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarduploadComponent } from './cardupload.component';

describe('CarduploadComponent', () => {
  let component: CarduploadComponent;
  let fixture: ComponentFixture<CarduploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarduploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarduploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
