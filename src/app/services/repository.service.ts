
import { ToastrService } from 'ngx-toastr';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, interval, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserDetails, UserData } from 'app/model/acknowledgment';
import { User, UserToken } from 'app/auth/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnvService } from 'app/env.service';

@Injectable({ providedIn: 'root' })
export class RepositoryServices {   
    public url:string;   
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public header : any; 
    public progress: number;
    public message: string;
     
    public dataSubject = new Subject<number>();
    public dataState = this.dataSubject.asObservable();

    public repoURL:string ="";
    
  
    @Output() public onUploadFinished = new EventEmitter();
    //httpClient: any;
    constructor(private toastr: ToastrService,private http: HttpClient,private env: EnvService) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
       this.repoURL = env.apiUrl;
     }
     public get currentUserValue(){
        return this.currentUserSubject.value;
    }   
    getRepoDetailsByRepoName(username:string,name:string): Observable<any> {
    
            let headers = new HttpHeaders()
          .set('Content-Type', 'application/json')          
              return this.http.get<any>(this.repoURL+'/repos/'+username+'/'+name,{ headers });             
            
    }
    getRepoList(username:string): Observable<any> {
             let headers = new HttpHeaders()
           .set('Content-Type', 'application/json')          
               return this.http.get<any>(this.repoURL+'/users/'+username+'/repos?type=owner?per_page=100',{ headers });             
             
     }
     getCommittersList(owner:string,repos:string): Observable<any> {
      //debugger ;
        //https://api.github.com/repos/owner/repo/commits
            let headers = new HttpHeaders()
          .set('Content-Type', 'application/json')          
              return this.http.get<any>(this.repoURL+'/repos/'+owner+'/'+repos+'/commits',{ headers });             
            
    }
    login(user: User): Observable<any> { 
       const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };        
       return this.http.post<any>(this.url+'Login/UserLogin',user,httpOptions);  
     }
    otp(obj: any): Observable<any> { 
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
      
     return this.http.post<any>(this.url+'Login/TokenAuthorization',obj,httpOptions);  
     }    
}