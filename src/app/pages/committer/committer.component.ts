import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails, User, UserData } from 'app/model/acknowledgment';
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
  UserDetailsArr =  [];
  acknowledgeData:UserData[];
  pageNumber = "1";
  pageSize = "10";
  error: string;
  success: string;  
  
  repoName = null;
  
  displayedColumns: string[] = ['name','description'];
    
  dataSource: MatTableDataSource<UserData>;
  committerList = Array();
      
  ELEMENT_DATA: UserData[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router,private repositoryServices: RepositoryServices,private activatedRoute:ActivatedRoute ){
        
       }  
     ngOnInit(): void{       
     // console.log("Repo name: "+this.activatedRoute.snapshot.params.name);
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
    let description = null;
    let name = null;    
    this.processElementArrData(responseObj);
    
    this.getNoOfAppearance(this.committerList);//
    }
    processElementArrData(responseObj:any){      
      let objKeys = Object.keys(responseObj);
      for (let item of objKeys) {
        let commit = responseObj[item]['commit'];
        let committer = responseObj[item]['commit']['committer'];
        let email = committer.email;
        let name = committer.name;  
       
        this.committerList.push(name);       
        const user: UserData = new User();
        user.name = name;
        user.description = email;
      
        localStorage.setItem("FrequencyObj",JSON.stringify(this.committerList));

        this.ELEMENT_DATA.push(user);
      }
    }
    getNoOfAppearance(a:any){           
      var map = a.reduce(function(obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {});
      localStorage.setItem("FrequencyObj",JSON.stringify(map));
      console.log("Map Result 5: "+localStorage.getItem('FrequencyObj'));
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
 
 
  
  
  

