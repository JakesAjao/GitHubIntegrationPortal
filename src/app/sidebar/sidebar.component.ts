import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs/internal/Subject';
import { EnvService } from 'app/env.service';
import { Timeout } from 'app/model/timer';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
     { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },   //CreditCard 
    //{ path: '/repo',       title: 'Repository',   icon:'nc-single-02',  class: '' },
    //{ path: '/blankcard',       title: 'Analytics',   icon:'nc-single-02',  class: '' },//blancards
    { path: '/analytics',       title: 'Analytics',   icon:'nc-diamond',  class: '' },//blancards
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
    timer:Timeout= new Timeout();
    constructor(
        private toastr: ToastrService,private router: Router,private idle: Idle, private keepalive: Keepalive,
        private env: EnvService){        
         // this.doIdleTimeout(idle,keepalive); 
        this.timer.processTimer(idle,router,toastr,env,keepalive);  
    }
    
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
     
    }
    
}
