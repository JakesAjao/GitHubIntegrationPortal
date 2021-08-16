import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot() ],
      providers: [ AuthService ,HttpClient,HttpHandler,EnvService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  //   AuthService: fixture.debugElement.injector.get(AuthService);

  // formBuilder: fixture.debugElement.injector.get(FormBuilder);
  // spinner: fixture.debugElement.injector.get(NgxSpinnerService);
     fixture.detectChanges();
  });

    it('should create', () => {
      expect(component).toBeTruthy();
   });

});
