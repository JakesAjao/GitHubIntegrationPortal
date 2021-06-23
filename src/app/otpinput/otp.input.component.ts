import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthService } from 'app/auth/auth.service';
import { EnvService } from 'app/env.service';
import { Setting } from 'app/model/setting';
import { User } from 'app/model/user';
import { CreditCardServices } from 'app/services/creditcardServices';
import { OTPService } from 'app/services/otp.service';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CounterDirective } from './directives/timer.directives';
import { KeysPipe } from './pipes/keys.pipe';
@Component({
  selector: 'otp',
  templateUrl: './otp.input.component.html',
  styleUrls: ['./otp.input.component.scss']
})
export class OtpInputComponent implements OnInit {
public inputValue:string;

private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Input() setting: Setting = { 
      length: 4, 
      timer: 0
    };
    lastPing?: Date = null;
    title = 'angular-idle-timeout';
    idleState = 'Not started.';
    timedOut = false;
    @Output() onValueChange = new EventEmitter<any>();
    @ViewChildren(CounterDirective) CounterDirective;
    otpForm: FormGroup;
    
    inputControls: FormControl[] = new Array(this.setting.length);
    componentKey = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    public counter: number;
    
    constructor(private keysPipe: KeysPipe,private otpService: OTPService,
      private SpinnerService: NgxSpinnerService,
      private toastr: ToastrService,
      private httpClient: HttpClient,
      private env: EnvService,
      private router: Router,private creditcardService:CreditCardServices,
      private authService:AuthService,private idle: Idle,private keepalive: Keepalive) {
      console.log('Hi: '+this.env.idelTimeInSecond)  ;
        var IdleTime:number=+this.env.idelTimeInSecond;
        // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(IdleTime);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(IdleTime);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => { 
        this.idleState = 'No longer idle.'
        console.log(this.idleState);
        this.reset();
        },
        idle.onTimeout.subscribe(() => {
          this.idleState = 'Timed out!';
          this.timedOut = true;
          console.log(this.idleState);
          
          localStorage.setItem('adminUser', "");
          //this.authService.logout(); 
        this.router.navigate(['/login']);
      }));
      
      idle.onIdleStart.subscribe(() => {
          this.idleState = 'You\'ve gone idle!'
          console.log(this.idleState);
          //this.childModal.show();
          console.log("logging out");
      });
      
      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
        console.log(this.idleState);
      });

      // sets the ping interval to 15 seconds
      keepalive.interval(2);

      keepalive.onPing.subscribe(() => this.lastPing = new Date());
          }
    reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }
    public ngOnInit(): void {
      console.log('Hey')  ;
      this.otpForm = new FormGroup({})
      for (let index = 0; index < this.setting.length; index++) {
        this.otpForm.addControl(this.getControlName(index), new FormControl())
      }
    }
    
    public ngAfterViewInit(): void {
      let containerItem = document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        let ele: any = containerItem.getElementsByClassName('.otp-input')[0]
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  
    private getControlName(idx) {
      return `ctrl_${idx}`;
    }
  
    isLeftArrow(e) {
      return this.isKeyCode(e, 37);
    }
  
    isRightArrow(e) {
      return this.isKeyCode(e, 39);
    }
  
    isBackspaceOrDelete(e) {
      return e.key === "Backspace" || e.key === "Delete" || this.isKeyCode(e, 8) || this.isKeyCode(e, 46);
    }
  
    isKeyCode(e, targetCode) {
      var key = e.keyCode || e.charCode;
      if(key == targetCode) { return true; }
      return false;
    }
  
    keyUp(e, inputIdx: number) {
      let nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
      let prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
      if (this.isRightArrow(e)) {
        this.setSelected(nextInputId);
        return;
      }
      if (this.isLeftArrow(e)) {
        this.setSelected(prevInputId);
        return;
      }
      let isBackspace = this.isBackspaceOrDelete(e);
      if (isBackspace && !e.target.value) {
        this.setSelected(prevInputId);
        this.rebuildValue();
        return;
      }
      if (!e.target.value) {
        return;
      }
      if (this.isValidEntry(e)) {
        this.focusTo(nextInputId);
      }
      this.rebuildValue();
    }
  
    appendKey(id) {
      return `${id}_${this.componentKey}`;
    }
  
    setSelected(eleId) {
      this.focusTo(eleId);
      let ele: any = document.getElementById(eleId);
      if (ele && ele.setSelectionRange) {
        setTimeout(() => {
          ele.setSelectionRange(0, 1);
        }, 0);
      }
    }
  
    isValidEntry(e) {
      var inp = String.fromCharCode(e.keyCode);
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      return isMobile || /[a-zA-Z0-9-_]/.test(inp) || (this.setting.allowKeyCodes && this.setting.allowKeyCodes.includes(e.keyCode)) || (e.keyCode >= 96 && e.keyCode <= 105);
    }
  
    focusTo(eleId) {
      let ele: any = document.getElementById(eleId);
      if (ele) {
        ele.focus();
        ele.selectionStart = ele.selectionEnd = 100;
      }
    }
  
    rebuildValue() {
      let val = '';
      this.keysPipe.transform(this.otpForm.controls).forEach(k => {
        if (this.otpForm.controls[k].value) {
          val += this.otpForm.controls[k].value;
        }
      });
      this.inputValue = val;
     //console.log('this.inputValue:'+this.inputValue);
      this.onValueChange.emit(val);
    }
  
    public onCounterChange(e): void {
      this.counter = e;
      if(this.counter == 0) {
        this.onValueChange.emit(-1);
      }
    }
  
    // ressendOtp(): void {
    //   this.CounterDirective.first.startTimer();
    //   this.onValueChange.emit(-2);
    // }
    backToLogin(){
      this.authService.logout();
    }
    submitOtp():void{
     // debugger;
      //console.log("this.inputValue: "+this.inputValue);
      let userName = localStorage.getItem('staffName'); 
      console.log('staffName: '+userName);
      let tokenName = this.inputValue;
      var user = new User();
      user.userName = userName;
      user.userToken = tokenName;
      
     console.log('user.userToken: '+user.userToken);
      
      const obj = JSON.stringify(user);
      console.log('json user: '+obj);
      this.SpinnerService.show(); 
      //debugger;
      this.creditcardService.otp(obj).subscribe(
        (response)=>
        {   
          //debugger;
          console.log('Response: '+JSON.parse(response));                 
          let isSuccessful:boolean = (response.isSuccessful);
          if (isSuccessful){
         // console.log(response);
            let data = (response.data);
            let isSuccessful = data.isSuccessful;
            let message = data.message;
            let statusCode = data.statusCode;
            let department = data.department;
            console.log('isSuccessful: '+isSuccessful); 
   
            let returnURL = localStorage.getItem('returnUrl'); 
  
            if ((returnURL =="" )||(returnURL ==null )){ 
              
              this.router.navigate(['/#/dashboard']);       
            }
            else{
              this.router.navigate([returnURL]);
            }   
            this.creditcardService.showSuccess('You have successfully logged in!','Login Notification.');
            this.SpinnerService.hide();
          }
          else{
            console.log("IsSuccessful False: "+JSON.stringify(response));
          }
               
        },
        (error)=>{           
          console.log("Error: "+JSON.stringify(error));
            //this.loggedIn.next(false);
            let isSuccessful = this.authService.GetServerResponse(error);
            if (isSuccessful==false){
              this.loggedIn.next(false);
              this.creditcardService.showFailure('Invalid Token Supplied.','Login Notification.');
            }
            else{
              this.creditcardService.showFailure('Oops! Server could not be reached. Kindly contact administrator.','Login Notification.'); 
            }  
            this.SpinnerService.hide();       
        }
        //(error) => console.log(error){}
       )    
   }
    //    debugger;
    //   this.SpinnerService.hide();
     
      
  }
  
