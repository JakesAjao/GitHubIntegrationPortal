import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  ngOnInit(): void {
  }
  public settings = {
    length: 6,
    numbersOnly: true,
    timer: 12
  };

  constructor() {}

  public onInputChange(e) {
    console.log(e);
    if (e.length == this.settings.length) {
      // e will emit values entered as otp and,
      console.log('otp is', e);
    } else if (e == -1) {
      // if e == -1, timer has stopped
      //alert('Hi');
      console.log(e, 'resend button enables');
    } else if (e == -2) {
      // e == -2, button click handle
      console.log('resend otp');
    }
  }
}