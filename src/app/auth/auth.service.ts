import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from 'app/env.service';
import { NotifyMe } from 'app/model/notification';
import { LoginServices } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { LogService } from 'app/services/log.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public flag:boolean;
  public notification:any;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,private httpClient: HttpClient,private loginService: LoginServices,
    private env: EnvService, private toaster:ToastrService, private logger: LogService
  ) {
    this.notification = new  NotifyMe(toaster);
  }

  login(user: User,spinner:any){  
    
    localStorage.setItem("username",user.userName);
    if (user.userName != '' ||user.userName!=null) {      
      
      this.loginService.login(user).subscribe(
        (responseObj)=>
        {
          this.validateUser(responseObj,spinner);
        },
        (error)=>{  
          this.logger.error('Invalid Username.', 4);
          //console.log(error);
              this.loggedIn.next(false);
              this.notification.showFailure('Invalid Username.','Login Notification.');
            
            spinner.hide();       
        }
         
      )
      }   
  }
  validateUser(responseObj:any,spinner:any){
   
    let username = null;    
    let objKeys = Object.keys(responseObj);
    let name = null;
    for (let item of objKeys) {
      if (item=='login'){
       this.validationSuccessful(item,responseObj,spinner);
       return;
      }             
      this.validationFailed(name,spinner); 
    }  
  }  
  validationSuccessful(item:string,responseObj:any,spinner:any){
    
    let username = null;
    let name = null;      
      username = responseObj[item];   
      name = responseObj[item];      
    localStorage.setItem('username', username);  
    localStorage.setItem('name', name);
    
    this.router.navigate(['/#/dashboard']);
    this.notification.showSuccess('You have successfully logged in!','Login Notification.');
     this.logger.info('You have successfully logged in!', 2);
    spinner.hide();                        
  
  }
  validationFailed(name:string,spinner:any){
      this.notification.showFailure('Oop! Invalid Username.','Login Notification.');
    
     this.router.navigate(['/login']);
     this.logger.error('Oop! Invalid Username.', 4);
      spinner.hide();
     } 

  GetServerResponse(error:any){
      if (error==null){
        return null;
      }
      else{      
        for(var key in error)
        {
          if (key=='error'){
            var headerString =  error[key];
            let Errorstring = JSON.stringify(headerString)
            var s = JSON.parse(Errorstring);
            return s.isSuccessful;
          }
        }
    }
  }
  logout() {
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    this.router.navigate(['/login']);     
    localStorage.setItem('returnUrl',""); 
    this.notification.showSuccess('You have successfully logged out!','Login Notification.');
    this.logger.info("You have successfully logged out!",2);   
  }
}