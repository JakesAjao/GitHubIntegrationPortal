import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { EnvService } from 'app/env.service';
import { UserDetails, User, UserData } from 'app/model/acknowledgment';
import { Timeout } from 'app/model/timer';
import { RepositoryServices } from 'app/services/repository.service';

import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  acknowledgeForm: FormGroup;
  selection = new SelectionModel<UserData>(true, []);
  isallSelectedStatus:boolean;
  aSelectedCheckId:number;
  UserDetailsArr =  [];
  acknowledgeData:UserData[];
  pageNumber = "1";
  pageSize = "10";
  error: string;
  success: string;
  
  username = localStorage.getItem('username');
  
  displayedColumns: string[] = ['id', 'name','description','action'];
    
  dataSource: MatTableDataSource<UserData>;
      
  ELEMENT_DATA: UserData[] = [];
   rows = [];
   timer:Timeout= new Timeout();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
  constructor(
    private bnIdle: BnNgIdleService,private toastr: ToastrService,
    private router: Router,private idle: Idle, private keepalive: Keepalive,private env: EnvService,private repositoryServices: RepositoryServices,
    private SpinnerService: NgxSpinnerService){      
    
    this.timer.processTimer(idle,router,toastr,env,keepalive);
     
  }
  ngOnInit(): void{ 
    this.success="" ;
    this.error = "";
      this.fetchRepoDetails();      
        
  } 
  fetchRepoDetails(){
      this.repositoryServices.getRepoList(this.username).subscribe(
      (response)=>{
       //console.log("Response 1: " + JSON.stringify(response));
       let cardObjData = response.data; 
     
       this.getRepoDetails(response);
       //console.log('cardObjData: '+cardObjData)
       
       const users = Array.from(this.ELEMENT_DATA);     
       this.dataSource = new MatTableDataSource(users);       
       this.dataSource.paginator = this.paginator;
         
       this.dataSource.sort = this.sort;
     },
     (error) => console.log(error)
     ) 
} 
  
  getRepoDetails(responseObj:any){        
    let objKeys = Object.keys(responseObj);

  //Now we can use objKeys to iterate over myObj
  let description = null;
  let name = null;
  let full_name = null;

  for (let item of objKeys) {
    //this will print out the keys
    full_name = responseObj[item]['full_name'];
               
     const card: UserData = new User(); 
   
     card.id = responseObj[item]['id'];
    
     card.description = responseObj[item]['description']; 
     card.name = responseObj[item]['name']; 
    this.ELEMENT_DATA.push(card);

  } 
  }
  refresh():void {
    
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  applyFilter(filterValue: string) {
  
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }         
   
}  


