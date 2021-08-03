import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from 'app/env.service';
import { NotifyMe } from 'app/model/notification';
import { LoginServices } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

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
    private env: EnvService, private toaster:ToastrService
  ) {
    this.notification = new  NotifyMe(toaster);
  }

  login(user: User,spinner:any){  
    
    localStorage.setItem("username",user.userName);
    //console.log("user.userName: "+user.userName);
    if (user.userName != '' ||user.userName!=null) {      
      
      this.loginService.login(user).subscribe(
        (responseObj)=>
        {
          let objKeys = Object.keys(responseObj);
          let username = null;
          let name = null;
          for (let item of objKeys) {
            //this will print out the keys
            //console.log('key:', item);
            if (item=='login'){       
              username = responseObj[item];   
            console.log('username:', responseObj[item]);
            }
            if (item=='name'){
            name = responseObj[item];
            
            console.log('name:', responseObj[item]);
            } 
             
          localStorage.setItem('username', username);  
          localStorage.setItem('name', name);                
         
         console.log("responseObj: "+responseObj); 
            
         if (name=='' ||name==null){
          this.router.navigate(['/#/login']); 
          this.notification.showFailure('Invalid Username.','Login Notification.');
         }
         else{
         this.router.navigate(['/#/dashboard']);  

          this.notification.showSuccess('You have successfully logged in!','Login Notification.');
          spinner.hide();
         }
                
          }
        },
        (error)=>{            
          console.log(error);
            //this.loggedIn.next(false);
            //let isSuccessful = this.GetServerResponse(error);
            //if (isSuccessful==false){
              this.loggedIn.next(false);
              this.notification.showFailure('Invalid Username.','Login Notification.');
          
            // else{
            //   this.creditcardService.showFailure('Oops! Server could not be reached. Kindly contact administrator.','Login Notification.'); 
            // }  
            spinner.hide();       
        }
        //(error) => console.log(error){}
      )
      }
    //}
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

          //console.log("Server response: " + Errorstring);
          return s.isSuccessful;
        }
      }
  }
  logout() {
    //this.loggedIn.next(false);
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    this.router.navigate(['/login']);
     
    localStorage.setItem('returnUrl',""); 
    this.notification.showSuccess('You have successfully logged out!','Login Notification.');
  }
}