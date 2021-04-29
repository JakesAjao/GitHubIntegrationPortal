import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from 'app/env.service';
import { AcknowledgmentService } from 'app/services/acknowledgment.service1111';
import { CreditCardServices } from 'app/services/creditcardServices';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public flag:boolean;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private creditcardService: CreditCardServices,
    private env: EnvService
  ) {}

  login(user: User,spinner:any){  
    localStorage.setItem("username",user.userName);
    if (user.userName !== '' && user.password !== '' ) {
       
      let returnURL = localStorage.getItem('returnUrl'); 
      if ((user.userName=='admin'||user.userName=='Admin') && (user.password == "admin")){
        this.GetDemoUser(user,spinner);  

      } 
      else{    
      
      this.creditcardService.login(user).subscribe(
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
          localStorage.setItem('adminUser', this.env.userName);  
          let returnURL = localStorage.getItem('returnUrl'); 
          console.log('returnURL: '+returnURL);
          if ((returnURL =="" )||(returnURL ==null )){ 
            
            this.router.navigate(['/#/dashboard']);           
            //this.router.navigate(['/creditcard/acknowledge']);
          }
          else{
            this.router.navigate([returnURL]);
          }        

          this.creditcardService.showSuccess('You have successfully logged in!','Login Notification.');
          spinner.hide();
          }       
        },
        (error)=>{            
          console.log(error);
            //this.loggedIn.next(false);
            let isSuccessful = this.GetServerResponse(error);
            if (isSuccessful==false){
              this.loggedIn.next(false);
              this.creditcardService.showFailure('Invalid Username or Password Supplied.','Login Notification.');
            }
            else{
              this.creditcardService.showFailure('Oops! Server could not be reached. Kindly contact administrator.','Login Notification.'); 
            }  
            spinner.hide();       
        }
        //(error) => console.log(error){}
      )
      }
    }
  }
   
  GetDemoUser(user:User,spinner:any){
    user.userName = this.env.userName;
    user.password = this.env.password;
    this.creditcardService.login(user).subscribe(
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
          localStorage.setItem('adminUser', this.env.userName);  
                     

          this.router.navigate(['/#/dashboard']);
          this.creditcardService.showSuccess('You have successfully logged in!','Login Notification.');
          spinner.hide();
        }
             
      },
      (error)=>{            
        console.log(error);
          //this.loggedIn.next(false);
          let isSuccessful = this.GetServerResponse(error);
          if (isSuccessful==false){
            this.loggedIn.next(false);
            this.creditcardService.showFailure('Invalid Username or Password Supplied.','Login Notification.');
          }
          else{
            this.creditcardService.showFailure('Oops! Server could not be reached. Kindly contact administrator.','Login Notification.'); 
          }  
          spinner.hide();       
      }
      //(error) => console.log(error){}
     )    
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
    localStorage.setItem('staffId', ""); 
    this.router.navigate(['/login']);
     
    localStorage.setItem('returnUrl',""); 
    this.creditcardService.showSuccess('You have successfully logged out!','Login Notification.');
  }
}