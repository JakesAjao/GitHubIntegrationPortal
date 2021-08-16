import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { AuthService } from 'app/auth/auth.service';
import { EnvService } from 'app/env.service';
import { EnvServiceProvider } from 'app/env.service.provider';
import { ConfirmDialogService } from 'app/services/confirm-dialog.service';

import { CommitterComponent } from './committer.component';

describe('CommitterComponent', () => {
  let component: CommitterComponent;
  let fixture: ComponentFixture<CommitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ CommitterComponent ],
      providers: [ FormBuilder,  HttpClientModule, AuthGuard,
        EnvService,Router],
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
