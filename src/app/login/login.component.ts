import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'app/env.service';
import { User, UserData } from 'app/model/acknowledgment';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bnIdle: BnNgIdleService,
    private SpinnerService: NgxSpinnerService,
    private env: EnvService,
    private route: ActivatedRoute,
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
    });
    localStorage.setItem("adminUser","");
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
   isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(){
  // debugger;
    if (this.form.valid) {       
      this.authService.login(this.form.value,this.SpinnerService);     
     }
    this.formSubmitAttempt = true;   
      
    }  
}