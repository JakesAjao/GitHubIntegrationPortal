import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
      this.showSuccess('You have successfully logged in!','Login Notification.');
    }
    //this.showFailure();
  }
 
  showSuccess(header:string,message:string) {
    this.toastr.success(header, message);
  }
  showFailure(header:string,message:string) {
    this.toastr.error(header, message);
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.showFailure('You have successfully logged out!','Login Notification.');
  }
}