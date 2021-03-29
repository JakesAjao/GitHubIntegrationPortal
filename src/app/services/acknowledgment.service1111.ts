import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, interval, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CardData, UserData } from 'app/model/acknowledgment';
import { User } from 'app/auth/user';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({ providedIn: 'root' })
export class AcknowledgmentService {
   url = "http://172.27.8.145/CardTrackerPortalAPI/api/v1/";
    //url = "http://localhost/CardTrackerPortalAPI/api/v1/";    
       
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public header : any; 
    public progress: number;
    public message: string;
     
    public dataSubject = new Subject<number>();
    public dataState = this.dataSubject.asObservable();
    
  
    @Output() public onUploadFinished = new EventEmitter();
    //httpClient: any;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }
    public get currentUserValue(){
        return this.currentUserSubject.value;
    }   
    login(user: User): Observable<any> { 
       const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
       
       return this.http.post<any>(this.url+'Login/UserLogin',user,httpOptions);  
     }  

    getCardInventory(branchCode:string,token:string): Observable<any> { 
      let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', 'application/json')
    
        return this.http.get<any>(this.url+'Card/GetCardsWithBranchCode?branchCode='+branchCode,{ headers });  
       
      }
     updateStatus(token:string, data: string): Observable<any> {       
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + token}) };
      let resp = this.http.put<any>(this.url+"Card/UpdateMultipleRecords", data,httpOptions);
     
        return resp;  
      } 
      getBranchCode(staffId:string,token:string): Observable<any> { 
        let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
          return this.http.get<any>(this.url+'Card/GetBranch?staffId='+staffId,{ headers });        
        }
     uploadCard(formData: FormData,token:string):Observable<any> { 
        console.log(formData); 
        const httpOptions = { headers: new HttpHeaders({'Authorization': 'Bearer ' + token}) };    
      
       let resp =  this.http.post<FormData>(this.url+'FileUpload/UploadCards',formData,httpOptions);
       return resp;
        
        }    
     
}