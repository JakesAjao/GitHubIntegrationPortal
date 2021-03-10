import { Component, OnInit } from '@angular/core';
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
      const token = localStorage.getItem('token');
      this.acknowledgeService.getCardInventory("1","10",token).subscribe
    (
     (response)=>
      {
        // this.acknowledgeData = response; 
        let cardObjData = response.data;
        
        for(let i = 0, l = response.data.length; i < l; i++) {
     
          // We could also use `data.items[i].id`.      
        
        debugger;
         let CARD_DATA: UserData;
         // CARD_DATA.id = response.data[i].id;

         const card: UserData = new User();

         console.log('id: '+response.data[i].id);
         
         //alert('CARD_DATA: '+response.data[i].id);
         card.accountnumber = response.data[i].accountnumber;          
         card.customerid = response.data[i].customerid;        
         card.customername = response.data[i].customername;
         card.pan = response.data[i].pan;
         card.cardtype = response.data[i].cardtype;
         card.branchsol = response.data[i].branchsol;
         card.branchname = response.data[i].branchname;
         card.acknowledgedStatus = response.data[i].acknowledgedStatus; //          
         card.emailNotificationStatus = response.data[i].emailNotificationStatus;//
         card.datedispatched = response.data[i].dateAcknowledged;//

          //console.log('CARD_DATA: '+CARD_DATA);
          console.log('card: '+JSON.stringify(card));
        }             
      },
      (error) => console.log(error)
    ) 
    }
    this.formSubmitAttempt = true;
  }
  
  
}