import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },    
    { path: '/dispatchcard',       title: 'Dispatch Card',   icon:'nc-single-02',  class: '' },
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
    constructor(
        private bnIdle: BnNgIdleService,private toastr: ToastrService,private router: Router,){
          // this.bnIdle.startWatching(300).subscribe((res) => {//5 minutes
          //   if(res) {
          //       console.log("session expired");            
          //       this.showSuccess('Session expired!','Session Expired Alert');
          //       //this.loggedIn.next(false);
          //       this.router.navigate(['/login']);
          //   }
          // })
      }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.bnIdle.startWatching(300).subscribe((res) => {//5 minutes
            if(res) {
                console.log("session expired");            
                this.showSuccess('Session expired!','Session Expired Alert');
                //this.loggedIn.next(false);
                this.router.navigate(['/login']);
            }
          })
    }
    showSuccess(header:string,message:string) {
        this.toastr.success(header, message);
      }
    showFailure(header:string,message:string) {
        this.toastr.error(header, message);
      }
}
