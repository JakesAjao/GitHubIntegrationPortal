import { NgModule,  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp.input.component';
import { KeysPipe } from './pipes/keys.pipe';
import { NumberOnly } from './directives/numberOnly.directives';
import { CounterDirective } from './directives/timer.directives';
import { MatButtonModule } from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxMaskModule, IConfig } from 'ngx-mask'
@NgModule({
  declarations: [
    OtpInputComponent,
    KeysPipe,
    NumberOnly,
    CounterDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  exports: [
    OtpInputComponent,
    MatButtonModule,
    MatIconModule
  ],
  providers:[KeysPipe]
})
export class AngularOtpLibModule { }
