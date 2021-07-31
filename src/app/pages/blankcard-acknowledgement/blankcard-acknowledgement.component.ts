import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { BlankCard, BlankCardData, BlankCardImpl } from 'app/model/blankcard';
import { CreditCardServices } from 'app/services/creditcardServices';
import { ExcelService } from 'app/services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blankcard-acknowledgement',
  templateUrl: './blankcard-acknowledgement.component.html',
  styleUrls: ['./blankcard-acknowledgement.component.css']
})
export class BlankcardAcknowledgementComponent implements OnInit {
  acknowledgeForm: FormGroup;
  selection = new SelectionModel<BlankCardData>(true, []);
  isallSelectedStatus:boolean;
  aSelectedCheckId:number;
  cardDataArr =  [];
  acknowledgeData:UserData[];
  pageNumber = "1";
  pageSize = "10";
  
  token = localStorage.getItem('token');
  staffId = localStorage.getItem('staffId');
  
  displayedColumns: string[] = ['select','id', 'cardtype', 'batchno', 'branchname','solid','noofcards','datedispatched',

  'entrydate','status','acknowledged'];
    
  dataSource: MatTableDataSource<BlankCard>;
  
  error: string;
  success: string;
      
  ELEMENT_DATA: BlankCard[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router,private excelService:ExcelService, private creditcardService: CreditCardServices, 
      private activatedRoute:ActivatedRoute){
        
       }  
     ngOnInit(): void{ 
      //console.log('Activated Route id: '+this.activatedRoute.snapshot.params.id);

      let adminUser =  localStorage.getItem("adminUser");
      
      if (adminUser!=null){
        this.fetchAdminCardDetails();        
      }
      else{
      this.fetchCardDetails();  
      }   
    }  
    fetchBranchCode():any{      
      let staffId = localStorage.getItem('staffId'); 

      this.creditcardService.getBranchCode(staffId,this.token).subscribe(
     (response)=>{
      //console.log("Response: " + JSON.stringify(response));
      let cardObjData = response.data; 
      //let empId = cardObjData.soL_ID;
      
      //console.log('blankcardObj: '+cardObjData); 

      return cardObjData;    
     
      },
      (error) => console.log(error)
      ) 
      return null;   
    }  
    fetchCardDetails(){
      let branchDetails = this.fetchBranchCode();

      if (branchDetails==null){
        this.creditcardService.showSuccess('Sorry, the branch record does not exist.','Blankcard Acknowledgement Notification.'); 
        return;       
      }
      this.creditcardService.getBlankCardInventory(branchDetails.soL_ID,this.token).subscribe(
     (response)=>{
      console.log("Response: " + JSON.stringify(response));
      let cardObjData = response.data; 

      this.getBlankCardDetails(response);
      //console.log('cardObjData: '+cardObjData)
      
      const users = Array.from(this.ELEMENT_DATA);     
      this.dataSource = new MatTableDataSource(users);       
      this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
    },
    (error) => console.log(error)
    )        
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
      this.creditcardService.getBlankCardInventory("66",this.token).subscribe(
     (response)=>{
      console.log("Response: " + JSON.stringify(response));
      let cardObjData = response.data; 

      this.getBlankCardDetails(response);
      //console.log('cardObjData: '+cardObjData)
      
      const users = Array.from(this.ELEMENT_DATA);     
      this.dataSource = new MatTableDataSource(users);       
      this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
    },
    (error) => console.log(error)
    ) 
        
    }
    getBlankCardDetails(response:any){        
      for(let i = 0, l = response.data.length; i < l; i++) {                 
        const card: BlankCard = new BlankCardImpl(); 

        card.id = response.data[i].id;
        card.batcH_NO = response.data[i].batcH_NO;          
        card.brancH_NAME = response.data[i].brancH_NAME;        
        card.carD_TYPE = response.data[i].carD_TYPE;
        card.datE_OF_DISPATCH = response.data[i].datE_OF_DISPATCH;
        card.datedispatched = response.data[i].datE_OF_DISPATCH;
        card.entrY_DATE = response.data[i].entrY_DATE;
        card.nO_OF_CARDS = response.data[i].nO_OF_CARDS;
        card.soL_ID = response.data[i].soL_ID; //   
        card.status = response.data[i].status; //
        card.acknowledged = response.data[i].acknowledged; // 

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
     
      let cardDataList:Array<BlankCardData> = [];
      if (this.ELEMENT_DATA!=null){
       
      for(var elementData of this.ELEMENT_DATA){
        let cardData:BlankCardData = new BlankCardData();
        console.log(cardData.carD_TYPE);

        cardData.id = elementData.id;
        cardData.carD_TYPE = elementData.carD_TYPE;
        cardData.soL_ID = elementData.soL_ID;
        cardData.status = elementData.status;
        cardData.acknowledged = elementData.acknowledged;
         
        cardDataList.push(cardData);        
      }
      return cardDataList;
    }
      
    }
    processCheckboxSelected(event,element){
      let cardData: BlankCardData = new BlankCardData();
      if(event.checked)
      {
        let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));
        cardData = this.ParseObject(id);
        this.cardDataArr.push(cardData);         
        this.cardDataArr.forEach(x1 => x1.acknowledged = true);
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
      let cardData = new BlankCardData;

      cardData.id = this.ELEMENT_DATA[id].id;
      cardData.carD_TYPE = this.ELEMENT_DATA[id].carD_TYPE;
      cardData.soL_ID = this.ELEMENT_DATA[id].soL_ID;
      cardData.status = this.ELEMENT_DATA[id].status;
      cardData.acknowledged = this.ELEMENT_DATA[id].acknowledged;

      return cardData;
    }
    updateEach(event,element){//vital
   
      console.log(element.id+' checked'); 
      this.rows = this.rows.map(
        (elem) =>{ elem.acknowledged = this.ELEMENT_DATA.indexOf(elem.id) != -1 ? true : false;
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
        this.creditcardService.updateBlankStatus(this.token, cardDataJson).subscribe( 
          (data) =>{           
              this.successfulMessage(data);
              this.SpinnerService.hide(); 
              
            this.success= "Updated!";
          }),
          err => {
            console.log("Error");
            this.error= "Failed.";
            this.creditcardService.showFailure('Oops! Card Acknowledgement failed.','Blankcard Acknowledgement Notification.');
            this.SpinnerService.hide();
          }        
          
      }
    }
    updateAll(){ 
      let f = this.isAllSelected();
       if (this.isAllSelected() && (this.cardDataArr.length==0)){
        this.SpinnerService.show(); 
        let cardDataList = this.processAllSelected(); 
        
        cardDataList.forEach(x1 => x1.status = "acknowledged");   //Update each blank acknowledge status
        cardDataList.forEach(x1 => x1.acknowledged = true);   //Update each blank acknowledge status    
        let cardDataJson = JSON.stringify(cardDataList); 
        
        this.success= "Updated!";
        
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
        this.creditcardService.showSuccess('Card Acknowledged Successfully!','Blankcard Acknowledgement Notification.');
        this.success= "Updated!"; 
        this.refresh();
       }, 2000);
      }
    }
   
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      
      if (this.dataSource==null){
        return;
      }
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
     
       if (numSelected === numRows)   
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
      this.excelService.exportAsExcelFile(this.ELEMENT_DATA, 'Blankcard AcknowledgementReport'+"_"+formatValue);
    }
  }  
 
 
  