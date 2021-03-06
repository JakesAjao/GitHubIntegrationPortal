import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { AuthService } from 'app/auth/auth.service';
import { EnvService } from 'app/env.service';
import { EnvServiceProvider } from 'app/env.service.provider';
import { Timeout } from 'app/model/timer';
import { ConfirmDialogService } from 'app/services/confirm-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutes } from 'app/app.routing';
import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { User } from 'app/model/User';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let user = new User();
  user.userName = "JakesAjao";
  user.userToken ="sdfdsfddgdgfdgfdgf";
  let fb: FormBuilder;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [ AuthService ,HttpClient,HttpHandler,EnvService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
   
     fixture.detectChanges();
  });

    it('should create', () => {
      expect(component).toBeTruthy();
   });
   
 it('Form should be invalid',async(()=> {
  component.form.controls['userName'].setValue('');
  expect(component.form.valid).toBeFalsy();
  }));
 it('Form should be valid',async(()=> {
  component.form.controls['userName'].setValue('JakesAjao');
  expect(component.form.valid).toBeTruthy();
  }));

});
