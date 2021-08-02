import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, interval, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BarChartService {
    url = 'https://localhost:5001/churchdatabaseapi';
   
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public header : any; 
    public progress: number;
    public message: string;
     
    public dataSubject = new Subject<number>();
    public dataState = this.dataSubject.asObservable();
  
    @Output() public onUploadFinished = new EventEmitter();
    httpClient: any;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }      
    getTotalNewMembersVisitorPerMonth(year:string): Observable<any[]> {     
        return this.http.get<any[]>(this.url+'/charts/totalnewmembersvisitorpermonth/year='+year);  
      }      
    getTotalVisitorsPerMonth(): Observable<any[]> {     
      return this.http.get<any[]>(this.url+'/charts/totalvisitorspermonth');  
    }    
}