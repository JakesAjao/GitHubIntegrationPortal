import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private bnIdle: BnNgIdleService,private toastr: ToastrService,private router: Router,){
      this.bnIdle.startWatching(300).subscribe((res) => {//5 minutes
        if(res) {
            console.log("session expired");            
            this.showSuccess('Session expired!','Session Expired Alert');
            this.loggedIn.next(false);
            this.router.navigate(['/']);
        }
      })
  }
  showSuccess(header:string,message:string) {
    this.toastr.success(header, message);
  }
  showFailure(header:string,message:string) {
    this.toastr.error(header, message);
  }
  ngOnInit() { }
}
