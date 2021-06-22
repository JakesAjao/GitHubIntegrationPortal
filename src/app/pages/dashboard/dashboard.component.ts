import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import Chart from 'chart.js';
import { ToastrService } from 'ngx-toastr';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs/internal/Subject';
import { EnvService } from 'app/env.service';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  public menuItems: any[];
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  public canvas : any;

  constructor(
    private bnIdle: BnNgIdleService,private toastr: ToastrService,
    private router: Router,private idle: Idle, private keepalive: Keepalive,private env: EnvService){
             
     var IdleTime:number=+this.env.idelTimeInSecond;
           
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
      keepalive.interval(15);
  
      keepalive.onPing.subscribe(() => this.lastPing = new Date());
  
      this.reset();
    
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  showSuccess(header:string,message:string) {
    this.toastr.success(header, message);
  }
  showFailure(header:string,message:string) {
    this.toastr.error(header, message);
  }
    ngOnInit(){
      // this.bnIdle.startWatching(300).subscribe((res) => {//5 minutes
      //   if(res) {
      //       console.log("session expired");            
      //       this.showSuccess('Session expired!','Session Expired Alert');
      //       //this.loggedIn.next(false);
      //       this.router.navigate(['/login']);
      //   }
      // })
      
     }
    }
