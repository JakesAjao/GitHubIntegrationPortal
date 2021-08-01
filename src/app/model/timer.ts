import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { EnvService } from 'app/env.service';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { RepositoryServices } from 'app/services/repository.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

export class Timeout {
    public menuItems: any[];
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    title = 'angular-idle-timeout';
    public canvas : any;

    processTimer(idle: Idle,router: Router,toastr: ToastrService,env: EnvService,keepalive: Keepalive){
      debugger;
    var IdleTime:number=+env.idelTimeInSecond;
           
    idle.setIdle(IdleTime);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(IdleTime);
   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

   idle.onIdleEnd.subscribe(() => { 
     this.idleState = 'No longer idle.'
     console.log(this.idleState);
     this.reset(idle);
     },
     idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
       console.log(this.idleState);
       
       localStorage.setItem('adminUser', ""); 
       router.navigate(['/login']);
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
 
     this.reset(idle);
    }
    reset(idle: Idle,) {
        idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
      }
}