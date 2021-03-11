import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserData } from 'app/model/acknowledgment';
import { AcknowledgmentService } from 'app/services/acknowledgment.service';
import { constructor } from 'jquery';


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
  ackArr = [];
  acknowledgeData:UserData[];
  pageNumber = "1";
  pageSize = "10";
  ReadOnlyStyleGuideNotes: boolean;
  
  displayedColumns: string[] = ['select','id', 'customerid', 'accountnumber', 'customername','pan','cardtype','branchsol',
  //'branchname','datedispatched','status','checked','actions'];
  'branchname','datedispatched','status'];
    
  dataSource: MatTableDataSource<UserData>;
      
    ELEMENT_DATA: UserData[] = [];
   rows = [];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder, private acknowledgeService: AcknowledgmentService){

    //   this.acknowledgeForm = fb.group({
    //     name: ["", Validators.required]
    // });
    
    const users = Array.from(this.ELEMENT_DATA);
    // Assign the data to the data source for the table to render
    
    this.dataSource = new MatTableDataSource(users);
     
    //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      
    this.dataSource.sort = this.sort;
    const token = localStorage.getItem('token');
    const staffId = localStorage.getItem('staffId');
    
    this.acknowledgeService.getCardInventory("1","10",token).subscribe
   (
   (response)=>
    {
      // this.acknowledgeData = response; 
      let cardObjData = response.data;
      
      for(let i = 0, l = response.data.length; i < l; i++) {     
      
      //debugger;
       let CARD_DATA: UserData;

       const card: UserData = new User();

      // console.log('id: '+response.data[i].id);
       
       card.id = response.data[i].id;
       card.accountnumber = response.data[i].accountnumber;          
       card.customerid = response.data[i].customerid;        
       card.customername = response.data[i].customername;
       card.pan = response.data[i].pan;
       card.cardtype = response.data[i].cardtype;
       card.branchsol = response.data[i].branchsol;
       card.branchname = response.data[i].branchname;
       card.acknowledgedStatus = response.data[i].acknowledgedStatus; //          
       card.emailNotificationStatus = response.data[i].emailNotificationStatus;//
       card.datedispatched = response.data[i].dateAcknowledged;//

         //console.log('card: '+JSON.stringify(card));
         this.ELEMENT_DATA.push(card);
        } 
      

      const users = Array.from(this.ELEMENT_DATA);   
      console.log('UserDataList Object users: '+users);   
      this.dataSource = new MatTableDataSource(users);       
      this.dataSource.paginator = this.paginator;
        
      this.dataSource.sort = this.sort;
      },
      (error) => console.log(error)
      )    
    }
  
     ngOnInit() {
    }
    
    applyFilter(filterValue: string) {
    
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    processCheckboxSelected(event,element){
      if(event.checked)
      {
        let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));
        console.log("Added object: ", this.ELEMENT_DATA[id]);
        this.ackArr.push(this.ELEMENT_DATA[id]); 
      }
      else
      {
          let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element.id));
          console.log("Remove object: ", this.ELEMENT_DATA[id]);
          this.ackArr.splice(this.ackArr.indexOf(this.ELEMENT_DATA[id]), 1);
      }
    }
    updateEach(event,element){
      
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
    updateCheckedList(element)
    {     
      
      console.log(element.id+' checked'); 
      this.rows = this.rows.map(
        (elem) =>{ elem.acknowledgedStatus = this.ELEMENT_DATA.indexOf(elem.id) != -1 ? true : false;
      return elem});
      //Find index of specific object using findIndex method.    
      // let id = this.ELEMENT_DATA.findIndex((obj => obj.id == element));
      // console.log(element);

      
    //Log object to Console.
    //console.log("Before update: ", this.ELEMENT_DATA[id])
    //Update object's name property.
    //this.ELEMENT_DATA[id].status ="0";

    //Log object to console again.
    //console.log("After update: ", this.ELEMENT_DATA[id])
    this.aSelectedCheckId = element.id;
    }
    editAcknowledge(){
      alert();
      //Find index of specific object using findIndex method.    
       let id = this.ELEMENT_DATA.findIndex((obj => obj.id == this.aSelectedCheckId));
       console.log(id);
      console.log("Before update: ", this.ELEMENT_DATA[id])
      //Update object's name property.
      this.ELEMENT_DATA[id].acknowledgedStatus =true;

    //Log object to console again.
    console.log("After update: ", this.ELEMENT_DATA[id])
    }
    updateAll(){
      if (this.isallSelectedStatus){
        console.log("Before update all: ", this.ELEMENT_DATA);

        this.ELEMENT_DATA.forEach(x1 => x1.acknowledgedStatus = true);

        //Log object to console again.
        console.log("After update: ", this.ELEMENT_DATA);
      }
     else{       
        this.ackArr.forEach(x1 => x1.acknowledgedStatus = true);
        console.log("After selectedArr update: ", this.ackArr);      
     }
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;

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
      alert(this.isallSelectedStatus);
     }
    }
  }  
 
  // export interface UserData {
  //   id: number;
  //   customerid: string;
  //   accountnumber: string;
  //   customername: string;
  //   pan: string;
  //   cardtype:string;
  //   branchsol:string;
  //   branchname:string;
  //   datedispatched:string
  //   status:boolean
  // }
 
  
  /**  Copyright 2020 Google LLC. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */
  