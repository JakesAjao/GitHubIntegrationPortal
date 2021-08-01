import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { ExcelService } from 'app/services/excel.service';
import { RepositoryServices } from 'app/services/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.css']
})
export class AcknowledgeComponent implements OnInit  {
//https://stackblitz.com/edit/angular-sim96p?file=app%2Ftable-selection-example.html
  
  acknowledgeForm: FormGroup;
  selection = new SelectionModel<UserData>(true, []);
  isallSelectedStatus:boolean;
  aSelectedCheckId:number;
  cardDataArr =  [];
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
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router,private excelService:ExcelService, 
      private repositoryServices: RepositoryServices, ){
        
       }  
     ngOnInit(): void{ 
      this.success="" ;
      this.error = "";
        this.fetchRepoDetails();      
          
    } 
    fetchRepoDetails(){
      //debugger;
      //this.repositoryServices.getRepoDetails("JakesAjao","Angular8FlexLayout").subscribe(
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
    
   
    successfulMessage(data:any){
      if (data!=null){
      setTimeout(()=>{                
        //console.log(data);
        console.log('selected All Status Response List: '+data);        
        this.SpinnerService.hide();
        this.repositoryServices.showSuccess('Card Acknowledged Successfully!','Acknowledgement Notification.');
    
        this.refresh();
       }, 2000);
      }
    }
   
    
  }  
 
 
  