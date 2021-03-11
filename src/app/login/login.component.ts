import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserData } from 'app/model/acknowledgment';
import { AcknowledgmentService } from 'app/services/acknowledgment.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
//import { NotificationService } from 'app/services/notification.service';

import { AuthService } from './../auth/auth.service';
//https://www.remotestack.io/create-login-ui-template-with-angular-material-design/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bnIdle: BnNgIdleService,
    private acknowledgeService: AcknowledgmentService
  ){
    // this.bnIdle.startWatching(60).subscribe((res) => {
    //   if(res) {
    //       console.log("session expired");
    //   }
    // })
  } 
  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
   isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    
    if (this.form.valid) {
      this.authService.login(this.form.value);    
     }
    this.formSubmitAttempt = true;
  }
  
  
}