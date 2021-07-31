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
  
  token = localStorage.getItem('token');
  staffId = localStorage.getItem('staffId');
  
  displayedColumns: string[] = ['select','id', 'name','description'];
    
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
        this.repositoryServices.getRepoList("JakesAjao").subscribe(
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
    // fetchBranchCode():any{      
    //   let staffId = localStorage.getItem('staffId'); 

    //   this.repositoryServices.getBranchCode(staffId,this.token).subscribe(
    //  (response)=>{
    //   console.log("Response: " + JSON.stringify(response));
    //   let cardObjData = response.data; 
    //   //let empId = cardObjData.soL_ID;
      
    //   console.log('cardObjData: '+cardObjData); 

    //   return cardObjData;    
     
    //   },
    //   (error) => console.log(error)
    //   ) 
    //   return null;   
    // }  
    // fetchCardDetails(){
    //   let branchDetails = this.fetchBranchCode();

    //   if (branchDetails==null){
    //     this.repositoryServices.showSuccess('Sorry, the branch record does not exist.','Acknowledgement Notification.'); 
    //     return;       
    //   }
    //   this.repositoryServices.getCardInventory(branchDetails.soL_ID,this.token).subscribe(
    //  (response)=>{
    //   console.log("Response: " + JSON.stringify(response));
    //   let cardObjData = response.data; 

    //   this.getRepoDetails(response);
    //   console.log('cardObjData: '+cardObjData)
      
    //   const users = Array.from(this.ELEMENT_DATA);     
    //   this.dataSource = new MatTableDataSource(users);       
    //   this.dataSource.paginator = this.paginator;
        
    //   this.dataSource.sort = this.sort;
    // },
    // (error) => console.log(error)
    // ) 
        
    // }
    getRepoDetails(responseObj:any){        
      let objKeys = Object.keys(responseObj);

    //Now we can use objKeys to iterate over myObj
    let description = null;
    let name = null;

    for (let item of objKeys) {
      //this will print out the keys
      console.log('id:', responseObj[item]['id']);
      console.log('name:', responseObj[item]['name']);
      console.log('description:', responseObj[item]['description']);      
                 
       const card: UserData = new User(); 
     
       card.id = responseObj[item]['id'];
      
       card.description = responseObj[item]['description']; 
       card.name = responseObj[item]['name']; 
      this.ELEMENT_DATA.push(card);

    }
      //for(let i = 0, l = response.data.length; i < l; i++) { 
       
      // for(let i = 0, l = responseObj.length; i < l; i++) {    
      //   JSON.stringify(responseObj)             
      //   const card: UserData = new User(); 

      //   card.id = responseObj.data[i].id;
      //  // card.description = response.data[i].description; 
      //   card.name = responseObj.data[i].name; 
      //   this.ELEMENT_DATA.push(card);
      //  }  
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
   
    UploadStatus(cardDataJson:string){
      if (cardDataJson != null){
        this.repositoryServices.updateStatus(this.token, cardDataJson).subscribe( 
          (data) =>{           
              this.successfulMessage(data); 
              this.success = "Updated!";  
              this.repositoryServices.showSuccess('Wow! Acknowledgement was Successful.','Search Notification.');  
          }),
          err => {
            console.log("Error");
            this.repositoryServices.showFailure('Oops! Card Acknowledgement failed.','Search Notification.');
            this.SpinnerService.hide();
            this.error = "Failed."; 
          }       
          
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
    // exportAsXLSX():void {
    //   let date = new Date();
    //   const formatValue = formatDate(date, 'yyyy-MM-dd', 'en-US');
    //   this.excelService.exportAsExcelFile(this.ELEMENT_DATA, 'AcknowledgementReport'+"_"+formatValue);
    // }
  }  
 
 
  