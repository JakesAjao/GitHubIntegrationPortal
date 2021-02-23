import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, interval, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserData } from 'app/model/acknowledgment';

@Injectable({ providedIn: 'root' })
export class AcknowledgmentService {
    url = 'https://localhost:5001/cardtrackerAPI/acknowledgment';
   
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
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }   
    getCardInventory(): Observable<UserData[]> {  
        return this.http.get<UserData[]>(this.url);  
      }
     sendMembershipRequest(data: any): Observable<any> {
        return this.http.post<any>(this.url+"/addmember", data);
      } 
     
      /*UpdateMember(formData:FormData,id:number):string{
        debugger;
        this.http.post<any>(this.url+'/id='+id,formData).subscribe(
          (res) => console.log(res),
         (err) => console.log(err));   
         return "Success";      
      }  */
      updateMember(formData: FormData) { 
        console.log(formData); 
       this.http.post<any>(this.url+'/updatemember',formData).subscribe(
        (res) => console.log(res),
       (err) => console.log(err));   
       //return "Success"; 
      }  
      getGenderTotal(): Observable<any> {  
        return this.http.get<any>(this.url+"/getgendertotal");  
      }     
     
    getMemberDetails(id: string): Observable<any> {  
      return this.http.get<any>(this.url + '/id=' + id);  
    } 
}