import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitterComponent } from './committer.component';

describe('CommitterComponent', () => {
  let component: CommitterComponent;
  let fixture: ComponentFixture<CommitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
