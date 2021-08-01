import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { ExcelService } from 'app/services/excel.service';
import { RepositoryServices } from 'app/services/repository.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-committer',
  templateUrl: './committer.component.html',
  styleUrls: ['./committer.component.css']
})
export class CommitterComponent implements OnInit {

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
  
  repoName = null;
  
  displayedColumns: string[] = ['name','description'];
    
  dataSource: MatTableDataSource<UserData>;
      
  ELEMENT_DATA: UserData[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router,private excelService:ExcelService, 
      private repositoryServices: RepositoryServices,private activatedRoute:ActivatedRoute ){
        
       }  
     ngOnInit(): void{ 
      
      console.log("Repo name: "+this.activatedRoute.snapshot.params.name);
      this.repoName = this.activatedRoute.snapshot.params.name;
      this.success="" ;
      this.error = "";
        this.fetchRepoDetails(this.repoName);      
          
    } 
    fetchRepoDetails(string ){
       let username = localStorage.getItem('username');
        this.repositoryServices.getCommittersList(username,this.repoName).subscribe(
        (response)=>{
                
         this.getRepoDetails(response);
         
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

    for (let item of objKeys) {
      let commit = responseObj[item]['commit'];
      //console.log('commit'+commit);
      let committer = responseObj[item]['commit']['committer'];
      //console.log('committerName: '+committer);
      let email = committer.email;
      let name = committer.name;
      console.log('email: '+email);
      console.log('name: '+name);
      const user: UserData = new User();
      user.name = name;
      user.description = email;

      this.ELEMENT_DATA.push(user);

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
   
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
       if ( numSelected === numRows)
   
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(){
     if (this.isAllSelected()){
      this.selection.clear();      
      this.isallSelectedStatus = false;
    } 
    else{
      this.isallSelectedStatus = true;
      this.dataSource.data.forEach(row => this.selection.select(row));
     }
     }
  }  
 
 
  
  
  

