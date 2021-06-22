import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs/internal/Subject';
import { EnvService } from 'app/env.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
     { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },    
    { path: '/creditcard',       title: 'Credit Card',   icon:'nc-single-02',  class: '' },
    { path: '/blankcard',       title: 'Blank Card',   icon:'nc-single-02',  class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' }
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    title = 'angular-idle-timeout';

    spinnerEnabled = false;
    keys: string[];
    dataSheet = new Subject();
    @ViewChild('inputFile') inputFile: ElementRef;
    isExcelFile: boolean;
    constructor(
        private toastr: ToastrService,private router: Router,private idle: Idle, private keepalive: Keepalive,
        private env: EnvService){        
          this.doIdleTimeout(idle,keepalive);    
    }
    doIdleTimeout(idle:Idle,keepalive: Keepalive){
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
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
     
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
}
