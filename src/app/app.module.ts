import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatFormFieldModule  } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Toaster } from "ngx-toast-notifications";
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { BackButtonDisableModule } from "angular-disable-browser-back-button";
//import { ButtonSpinnerComponent } from './button-spinner/button-spinner.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive, NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { EnvServiceProvider } from "./env.service.provider";
//import { AngularOtpLibModule } from "./otpinput/angular-otp-box.module";
import { CommitterComponent } from './pages/committer/committer.component';
import { CommitComponent } from './pages/commit/commit.component';
import { Timeout } from "./model/timer";
import { ConfirmDialogService } from "./services/confirm-dialog.service";
import {MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
       
  ],
  imports: [
    ReactiveFormsModule,
          FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    ShowHidePasswordModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forRoot(AppRoutes,{
    useHash: true,
    relativeLinkResolution: 'legacy',
     
}),

NgIdleKeepaliveModule.forRoot(), 
ToastrModule.forRoot(),
    SidebarModule,
    NavbarModule,    
    MatFormFieldModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatNativeDateModule,
    ReactiveFormsModule, 
       
  HttpClientModule,
  FlexLayoutModule,
  BackButtonDisableModule.forRoot({
    preserveScrollPosition: true
  }),
  NgxSpinnerModule
  ],
  exports: [    
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    //ConfirmDialogModule,  
  ],  
  //entryComponents: [ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  providers: [ HttpClientModule,AuthService, AuthGuard,EnvServiceProvider,Timeout,ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
