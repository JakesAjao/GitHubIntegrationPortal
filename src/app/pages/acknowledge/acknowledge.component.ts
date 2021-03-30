import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { CreditCardServices } from 'app/services/creditcardServices';
import { ExcelService } from 'app/services/excel.service';
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
  
  displayedColumns: string[] = ['select','id', 'customerid', 'accountnumber', 'customername','pan','foracid','cardtype','branchsol',

  'branchname','datedispatched','status'];
    
  dataSource: MatTableDataSource<UserData>;
      
  ELEMENT_DATA: UserData[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router,private excelService:ExcelService, private creditcardService: CreditCardServices, ){
        
       }  
     ngOnInit(): void{ 
      this.success="" ;
      this.error = "";

      let adminUser =  localStorage.getItem("adminUser");
      
      if (adminUser!=null){
        this.fetchAdminCardDetails();        
      }
      else{
      this.fetchCardDetails();  
      }      
    } 
    fetchAdminCardDetails(){
      let adminUser = localStorage.getItem("adminUser");
      if (adminUser==null)
      return ;
      // //let branchDetails = this.fetchBranchCode();

      // if (branchDetails==null){
      //   this.creditcardService.showSuccess('Sorry, the branch record does not exist.','Blankcard Acknowledgement Notification.'); 
      //   return;       
      // }
      this.creditcardService.getCardInventory("035",this.token).subscribe(
        (response)=>{
         //console.log("Response: " + JSON.stringify(response));
         let cardObjData = response.data; 
   
         this.getCardDetails(response);
         //console.log('cardObjData: '+cardObjData)
         
         const users = Array.from(this.ELEMENT_DATA);     
         this.dataSource = new MatTableDataSource(users);       
         this.dataSource.paginator = this.paginator;
           
         this.dataSource.sort = this.sort;
       },
       (error) => console.log(error)
       ) 
  } 
    fetchBranchCode():any{      
      let staffId = localStorage.getItem('staffId'); 

      this.creditcardService.getBranchCode(staffId,this.token).subscribe(
     (response)=>{
      console.log("Response: " + JSON.stringify(response));
      let cardObjData = response.data; 
      //let empId = cardObjData.soL_ID;
      
      console.log('cardObjData: '+cardObjData); 

      return cardObjData;    
     
      },
      (error) => console.log(error)
      ) 
      return null;   
    }  
    fetchCardDetails(){
      let branchDetails = this.fetchBranchCode();

      if (branchDetails==null){
        this.creditcardService.showSuccess('Sorry, the branch record does not exist.','Acknowledgement Notification.'); 
        return;       
      }
      this.creditcardService.getCardInventory(branchDetails.soL_ID,this.token).subscribe(
     (response)=>{
      console.log("Response: " + JSON.stringify(response));
      let cardObjData = response.data; 

      this.getCardDetails(response);
      console.log('cardObjData: '+cardObjData)
      
      const users = Array.from(this.ELEMENT_DATA);     
      this.dataSource = new MatTableDataSource(users);       
      this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
    },
    (error) => console.log(error)
    ) 
        
    }
    getCardDetails(response:any){        
      for(let i = 0, l = response.data.length; i < l; i++) {                 
        const card: UserData = new User(); 

        card.id = response.data[i].sno;
        card.accountnumber = response.data[i].accountnumber;          
        card.customerid = response.data[i].customerid;        
        card.customername = response.data[i].customername;
        card.pan = response.data[i].pan;
        card.cardtype = response.data[i].cardtype;
        card.branchsol = response.data[i].branchsol;
        card.branchname = response.data[i].branchname;
        card.acknowledgedStatus = response.data[i].acknowledgedStatus; //   
        card.activationStatus = response.data[i].activationStatus; // 
        card.pickupstatus = response.data[i].pickupstatus; //         
        card.emailNotificationStatus = response.data[i].emailNotificationStatus;//
        card.datedispatched = response.data[i].dateAcknowledged;//
        card.foracid = response.data[i].foracid;//

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
        console.log(cardData.customerid);

        cardData.sno = elementData.id;
        cardData.customerid = elementData.customerid;
        cardData.acknowledgedStatus = elementData.acknowledgedStatus;
        cardData.activationStatus = elementData.activationStatus;
        cardData.pickupstatus = elementData.pickupstatus;
         
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

      cardData.sno = this.ELEMENT_DATA[id].id;
      cardData.customerid = this.ELEMENT_DATA[id].customerid;
      cardData.acknowledgedStatus = this.ELEMENT_DATA[id].acknowledgedStatus;
      cardData.activationStatus = this.ELEMENT_DATA[id].activationStatus;
      cardData.pickupstatus = this.ELEMENT_DATA[id].pickupstatus;

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
        this.creditcardService.updateStatus(this.token, cardDataJson).subscribe( 
          (data) =>{           
              this.successfulMessage(data); 
              this.success = "Uploaded!";    
          }),
          err => {
            console.log("Error");
            this.creditcardService.showFailure('Oops! Card Acknowledgement failed.','Acknowledgement Notification.');
            this.SpinnerService.hide();
            this.success = "Failed."; 
          }        
          
      }
    }
    updateAll(){ 
      let f = this.isAllSelected();
       if (this.isAllSelected() && (this.cardDataArr.length==0)){
        this.SpinnerService.show(); 
        let cardDataList = this.processAllSelected(); 
        
        cardDataList.forEach(x1 => x1.acknowledgedStatus = true);   //Update each acknowledge status    
        let cardDataJson = JSON.stringify(cardDataList); 
        
        this.UploadStatus(cardDataJson);
       }
       else if (this.cardDataArr.length!=0){
        this.SpinnerService.show(); 
        let cardDataJson = JSON.stringify(this.cardDataArr);
        this.UploadStatus(cardDataJson);            
      }
      else{

      }
    }
    successfulMessage(data:any){
      if (data!=null){
      setTimeout(()=>{                
        //console.log(data);
        console.log('selected All Status Response List: '+data);        
        this.SpinnerService.hide();
        this.creditcardService.showSuccess('Card Acknowledged Successfully!','Acknowledgement Notification.');
    
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
    exportAsXLSX():void {
      let date = new Date();
      const formatValue = formatDate(date, 'yyyy-MM-dd', 'en-US');
      this.excelService.exportAsExcelFile(this.ELEMENT_DATA, 'AcknowledgementReport'+"_"+formatValue);
    }
  }  
 
 
  