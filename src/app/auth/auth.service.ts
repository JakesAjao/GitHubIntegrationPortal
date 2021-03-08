import { HttpClient } from '@angular/common/http';
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

  login(user: User) {
    debugger;
    if (user.userName !== '' && user.password !== '' ) {
      this.acknowledgmentService.login(user).subscribe(
        (response)=>
        {
          if (response!=null){
          console.log(response);
            let data = (response.data);
            let email = data.email;
            let staffName = data.staffName;
            let displayName = data.displayName;
            let department = data.department;
            let token = data.token;
            this.flag = true;

            if (this.flag){
            this.loggedIn.next(true);
            this.router.navigate(['/#/dashboard']);
            this.showSuccess('You have successfully logged in!','Login Notification.');
            }
          }        
        },
        (error)=>{
            console.log('Login Exception: '+error);
            this.loggedIn.next(false);
           // this.router.navigate(['/']);
            this.showFailure('Invalid login.','Login Notification.');          
        }
        //(error) => console.log(error){}
       )
    
    }
    //this.showFailure();
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