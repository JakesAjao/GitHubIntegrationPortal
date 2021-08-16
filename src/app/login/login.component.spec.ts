import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { AuthService } from 'app/auth/auth.service';
import { EnvService } from 'app/env.service';
import { EnvServiceProvider } from 'app/env.service.provider';
import { Timeout } from 'app/model/timer';
import { ConfirmDialogService } from 'app/services/confirm-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [ FormBuilder,  HttpClientModule,AuthService, AuthGuard,EnvServiceProvider,Timeout,
      ConfirmDialogService,EnvService,Router],
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    AuthService: fixture.debugElement.injector.get(AuthService);

  formBuilder: fixture.debugElement.injector.get(FormBuilder);
  spinner: fixture.debugElement.injector.get(NgxSpinnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', ()=>{
    expect(component.componentName).toBeTruthy("User");
  })
});
