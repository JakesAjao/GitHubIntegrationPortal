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
  
  username = localStorage.getItem('username');
  
  displayedColumns: string[] = ['id', 'name'];
    
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
       debugger;
      console.log(this.activatedRoute.snapshot.params.id);
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

    for (let item of objKeys) {
      //this will print out the keys
      console.log('id:', responseObj[item]['id']);
      console.log('name:', responseObj[item]['name']);
      //console.log('description:', responseObj[item]['description']);      
                 
       const card: UserData = new User(); 
     
       card.id = responseObj[item]['id'];
      
       //card.description = responseObj[item]['description']; 
       card.name = responseObj[item]['name']; 
      this.ELEMENT_DATA.push(card);

    }
    }
    refresh():void {
      console.log('fetchCardDetails called.');
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
    processAllSelected(){
     
      let cardDataList:Array<CardData> = [];
      if (this.ELEMENT_DATA!=null){
       
      for(var elementData of this.ELEMENT_DATA){
        let cardData:CardData = new CardData();
        console.log(cardData.id);

        // cardData.sno = elementData.id;
        // cardData.customerid = elementData.customerid;
        // cardData.acknowledgedStatus = elementData.acknowledgedStatus;
        // cardData.activationStatus = elementData.activationStatus;
        // cardData.pickupstatus = elementData.pickupstatus;
         
        cardDataList.push(cardData);        
      }
      return cardDataList;
    }
      
    }
    processCheckboxSelected(event,element){
      let cardData: CardData = new CardData();
      if(event.checked)
      {
        let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));

        cardData = this.ParseObject(id);
        this.cardDataArr.push(cardData);         
        this.cardDataArr.forEach(x1 => x1.acknowledgedStatus = true);
      }
      else
      {
          let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));
          cardData = this.ParseObject(id);
          this.cardDataArr.push(cardData);                    
         this.cardDataArr.splice(this.cardDataArr.indexOf(cardData), 1);
      }
    }
    ParseObject(id:number){
      let cardData = new CardData;

      // cardData.sno = this.ELEMENT_DATA[id].id;
      // cardData.customerid = this.ELEMENT_DATA[id].customerid;
      // cardData.acknowledgedStatus = this.ELEMENT_DATA[id].acknowledgedStatus;
      // cardData.activationStatus = this.ELEMENT_DATA[id].activationStatus;
      // cardData.pickupstatus = this.ELEMENT_DATA[id].pickupstatus;
      // cardData.foracid = this.ELEMENT_DATA[id].foracid;
      return cardData;
    }
    updateEach(event,element){//fital
   
      console.log(element.id+' checked'); 
      this.rows = this.rows.map(
        (elem) =>{ elem.status = this.ELEMENT_DATA.indexOf(elem.id) != -1 ? true : false;
      return elem});
      
      this.processCheckboxSelected(event,element);
      if (event){        
        
        return this.selection.toggle(event);
      }
      else{
        return null;
      }
    }
  
    // updateAll(){ 
    //   let f = this.isAllSelected();
    //    if (this.isAllSelected() && (this.cardDataArr.length==0)){
    //     this.SpinnerService.show(); 
    //     let cardDataList = this.processAllSelected(); 
        
    //     cardDataList.forEach(x1 => x1.acknowledgedStatus = true);   //Update each acknowledge status    
    //     let cardDataJson = JSON.stringify(cardDataList); 
        
    //     this.UploadStatus(cardDataJson);
    //    }
    //    else if (this.cardDataArr.length!=0){
    //     this.SpinnerService.show(); 
    //     let cardDataJson = JSON.stringify(this.cardDataArr);
    //     this.UploadStatus(cardDataJson);            
    //   }
    //   else{

    //   }
    // }
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
 
 
  
  
  

