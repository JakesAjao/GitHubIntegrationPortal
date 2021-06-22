
import { ToastrService } from 'ngx-toastr';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, interval, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CardData, UserData } from 'app/model/acknowledgment';

import { NgxSpinnerService } from 'ngx-spinner';
import { EnvService } from 'app/env.service';
import { User } from 'app/model/user';


@Injectable({ providedIn: 'root' })
export class OTPService {   
    public url:string;   
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public header : any; 
    public progress: number;
    public message: string;
     
    public dataSubject = new Subject<number>();
    public dataState = this.dataSubject.asObservable();
    
  
    @Output() public onUploadFinished = new EventEmitter();
    //httpClient: any;
    constructor(private toastr: ToastrService,private http: HttpClient,private env: EnvService) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
       this.url = env.apiUrl
     }
     public get currentUserValue(){
        return this.currentUserSubject.value;
    }   
  
    // public otp(user:User): Observable<any> { 
    //   debugger;
    //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      
    //   return this.http.post<any>(this.url+'Login/TokenAuthorization',user,httpOptions);  
    // }
}