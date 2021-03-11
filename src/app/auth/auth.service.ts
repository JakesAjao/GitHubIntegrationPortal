import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AcknowledgmentService } from 'app/services/acknowledgment.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public flag:boolean;
  url = 'https://localhost:5001/churchdatabaseapi/membership';
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private acknowledgmentService: AcknowledgmentService
  ) {}

  login(user: User,spinner:any) {
    if (user.userName !== '' && user.password !== '' ) {
      this.acknowledgmentService.login(user).subscribe(
        (response)=>
        {                    
          let isSuccessful:boolean = (response.isSuccessful);
          if (isSuccessful){
         // console.log(response);
            let data = (response.data);
            let email = data.email;
            let staffName = data.staffName;
            let displayName = data.displayName;
            let department = data.department;
            let staffId = data.staffID;
            let token = data.token;
            this.flag = true;

            localStorage.setItem('token', token);
            localStorage.setItem('staffId', staffId);         

            this.loggedIn.next(true);
            this.router.navigate(['/#/dashboard']);
            this.showSuccess('You have successfully logged in!','Login Notification.');
            spinner.hide();
          }
          // else{
          //   this.loggedIn.next(false);
          //   console.log(JSON.stringify(response));
          //   this.showFailure('Invalid login.','Login Notification.');
          // }        
        },
        (error)=>{
            
            this.loggedIn.next(false);
            let isSuccessful = this.GetServerResponse(error);
            if (isSuccessful==false){
              this.loggedIn.next(false);
              this.showFailure('Invalid Username or Password Credential Supplied.','Login Notification.');
            }
            else{
            this.showFailure('Oops! AD Server could not be reached. Kindly contact administrator.','Login Notification.'); 
            }  
            spinner.hide();       
        }
        //(error) => console.log(error){}
       )    
    }
  }
  GetServerResponse(error:any){
      if (error==null){
        return null;
      }
      for(var key in error)
      {
        if (key=='error'){
          var headerString =  error[key];
          let Errorstring = JSON.stringify(headerString)
          var s = JSON.parse(Errorstring);

          console.log("Server response: " + Errorstring);
          return s.isSuccessful;
        }
      }
  }
 
  showSuccess(header:string,message:string) {
    this.toastr.success(header, message);
  }
  showFailure(header:string,message:string) {
    this.toastr.error(header, message);
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.showSuccess('You have successfully logged out!','Login Notification.');
  }
}