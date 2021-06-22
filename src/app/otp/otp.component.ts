import { Component, OnInit } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/model/user';
import { OTPService } from 'app/services/otp.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
 
  title = 'angular-idle-timeout';
  idleState = 'Not started.';
  timedOut = false;
  ngOnInit(): void {
  }
  public settings = {
    length: 6,
    numbersOnly: true,
    timer: 12
  };

  constructor(private otpService: OTPService,private SpinnerService: NgxSpinnerService,
    
    private authService:AuthService,private idle: Idle,private keepalive: Keepalive) {}

  public onInputChange(e) {
    console.log("e: "+e);
    if (e.length == this.settings.length) {
      // e will emit values entered as otp and,

      //console.log('otp is', e);
    } else if (e == -1) {
      // if e == -1, timer has stopped
      //alert('Hi');
     // console.log(e, 'resend button enables');
    } else if (e == -2) {
      // e == -2, button click handle
      console.log('resend otp');
    }
  }
}