import { SelectionModel } from '@angular/cdk/collections';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CardData, User, UserData } from 'app/model/acknowledgment';
import { AcknowledgmentService } from 'app/services/acknowledgment.service';
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
  
  token = localStorage.getItem('token');
  staffId = localStorage.getItem('staffId');
  
  displayedColumns: string[] = ['select','id', 'customerid', 'accountnumber', 'customername','pan','cardtype','branchsol',

  'branchname','datedispatched','status'];
    
  dataSource: MatTableDataSource<UserData>;
      
    ELEMENT_DATA: UserData[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder, private acknowledgeService: AcknowledgmentService,
      private SpinnerService: NgxSpinnerService,private toastr: ToastrService,
      private router: Router){
   
    }  
     ngOnInit(){      
      this.processStatusUpdate();
    }
    refresh():void {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
    processStatusUpdate(){
      const users = Array.from(this.ELEMENT_DATA);
      // Assign the data to the data source for the table to render
      
      this.dataSource = new MatTableDataSource(users);
       
      //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
      this.acknowledgeService.getCardInventory("1","10",this.token).subscribe
    (
    (response)=>
      {
      // this.acknowledgeData = response; 
      let cardObjData = response.data;
      
      for(let i = 0, l = response.data.length; i < l; i++) {     
      
       let CARD_DATA: UserData;

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

         this.ELEMENT_DATA.push(card);
        }      

      const users = Array.from(this.ELEMENT_DATA);   
      //console.log('UserDataList Object users: '+users);   
      this.dataSource = new MatTableDataSource(users);       
      this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
      },
      (error) => console.log(error)
      )    
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
        //console.log("Added object: ", this.ELEMENT_DATA[id]);

        cardData.sno = this.ELEMENT_DATA[id].id;
        cardData.customerid = this.ELEMENT_DATA[id].customerid;
        cardData.acknowledgedStatus = this.ELEMENT_DATA[id].acknowledgedStatus;
        cardData.activationStatus = this.ELEMENT_DATA[id].activationStatus;
        cardData.pickupstatus = this.ELEMENT_DATA[id].pickupstatus;

        
        
        this.cardDataArr.push(cardData); 
        //console.log(" Added object this.cardData: ", cardData);
        
        this.cardDataArr.forEach(x1 => x1.acknowledgedStatus = true);

      }
      else
      {
          let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));
          cardData.sno = this.ELEMENT_DATA[id].id;
          cardData.customerid = this.ELEMENT_DATA[id].customerid;
          cardData.acknowledgedStatus = this.ELEMENT_DATA[id].acknowledgedStatus;
          cardData.activationStatus = this.ELEMENT_DATA[id].activationStatus;
          cardData.pickupstatus = this.ELEMENT_DATA[id].pickupstatus;

         // console.log("Remove object: ", this.ELEMENT_DATA[id]);
         // this.cardDataArr.splice(this.cardDataArr.indexOf(this.ELEMENT_DATA[id]), 1);
         
         this.cardDataArr.splice(this.cardDataArr.indexOf(cardData), 1);
      }
    }
    ParseObject(id:string){
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
    // updateCheckedList(element)
    // {     
      
    //   console.log(element.id+' checked'); 
    //   this.rows = this.rows.map(
    //     (elem) =>{ elem.acknowledgedStatus = this.ELEMENT_DATA.indexOf(elem.id) != -1 ? true : false;
    //   return elem});
    //   //Find index of specific object using findIndex method.    
    //   // let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element));
    //   // console.log(element);

      
    // //Log object to Console.
    // //console.log("Before update: ", this.ELEMENT_DATA[id])
    // //Update object's name property.
    // //this.ELEMENT_DATA[id].status ="0";

    // //Log object to console again.
    // //console.log("After update: ", this.ELEMENT_DATA[id])
    // this.aSelectedCheckId = element.id;
    // }
    // editAcknowledge(){
    //   alert();
    //   //Find index of specific object using findIndex method.    
    //    let id = this.ELEMENT_DATA.findIndex((obj => obj.id == this.aSelectedCheckId));
    //    console.log(id);
    //   console.log("Before update: ", this.ELEMENT_DATA[id])
    //   //Update object's name property.
    //   this.ELEMENT_DATA[id].acknowledgedStatus =true;

    // //Log object to console again.
    // console.log("After update: ", this.ELEMENT_DATA[id])
    // }
    UploadStatus(cardDataList:Array<CardData>,cardDataJson:string){
      if (cardDataJson != null){
        this.acknowledgeService.updateStatus(this.token, cardDataJson).subscribe( 
          (data) =>{           
              this.successfulMessage(data);      
          }),
          err => {
            console.log("Error");
            this.showFailure('Oops! Card Acknowledgement failed.','Acknowledgement Notification.');
          }  
      }
    }
    updateAll(){
      this.SpinnerService.show(); 
      debugger;
       if (this.isAllSelected){
        let cardDataList = this.processAllSelected(); 
        
        cardDataList.forEach(x1 => x1.acknowledgedStatus = true);   //Update each acknowledge status    
        let cardDataJson = JSON.stringify(cardDataList);
        
        console.log('cardData: '+cardDataJson);
        if (cardDataList != null){
          this.acknowledgeService.updateStatus(this.token, cardDataJson).subscribe( 
            (data) =>{           
                this.successfulMessage(data);      
            }),
            err => {
              console.log("Error");
              this.showFailure('Oops! Card Acknowledgement failed.','Acknowledgement Notification.');
            }  
        }
       }
       else if (this.cardDataArr!=null){
         //console.log("After selectedArr update: ", this.cardDataArr); 
        let cardDataJson = JSON.stringify(this.cardDataArr);
        this.acknowledgeService.updateStatus(this.token, cardDataJson).subscribe( 
        (data) =>{          
          this.successfulMessage(data);  
        }),
        err => {
          console.log("Error");
          this.showFailure('Card Acknowledgement failed!','Acknowledgement Notification.');
        }             
      }
    }
    successfulMessage(data:any){
      if (data!=null){
      setTimeout(()=>{                
        console.log(data);
        console.log('selected All Status Response List: '+data);
        
        this.SpinnerService.hide();

        this.showSuccess('Card Acknowledged Successfully!','Acknowledgement Notification.');
    
        this.refresh();
       }, 3000);
      }
    }
    showSuccess(header:string,message:string) {
      this.toastr.success(header, message);
    }
    showFailure(header:string,message:string) {
      this.toastr.error(header, message);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
       if ( numSelected === numRows)
      console.log('isAllSelected: '+true);
      else
      console.log('isAllSelected: '+false);
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(){
     if (this.isAllSelected()){
      this.selection.clear();      
      this.isallSelectedStatus = false;
     // console.log('selected false'+ this.isallSelectedStatus);
      //alert(this.isallSelectedStatus);
    } 
    else{
      this.isallSelectedStatus = true;
      this.dataSource.data.forEach(row => this.selection.select(row));
      //console.log('selected true'+ this.isallSelectedStatus);
     }
    }
  }  
 
 
  