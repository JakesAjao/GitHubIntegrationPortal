import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constructor } from 'jquery';
//import { ELEMENT_DATA } from '../../model/Element';


@Component({
  selector: 'app-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.css']
})
export class AcknowledgeComponent implements OnInit  {
//https://stackblitz.com/edit/angular-sim96p?file=app%2Ftable-selection-example.html
  
  acknowledgeForm: FormGroup;
  selection = new SelectionModel<UserData>(true, []);
  isallSelectedStatus = false;
  
  displayedColumns: string[] = ['select','id', 'customerid', 'accountnumber', 'customername','pan','cardtype','branchsol',
  'branchname','datedispatched','status','checked','actions'];
    
  dataSource: MatTableDataSource<UserData>;
      
   ELEMENT_DATA: UserData[] = [
    {id: "1", customerid: '123', accountnumber: "5", customername: 'jakes',pan: '7',cardtype:'mastercard',branchsol:'01',branchname:'Agbara',datedispatched:'03/02/2021',status:'1'},
    {id: "2", customerid: '12345', accountnumber: "55", customername: 'emmanuel',pan: '77',cardtype:'verve',branchsol:'03',branchname:'Ajah',datedispatched:'04/02/2021',status:'0'},
    {id: "3", customerid: '123456', accountnumber: "555", customername: 'ebelebe',pan: '777',cardtype:'visa',branchsol:'04',branchname:'Ikeja',datedispatched:'05/02/2021',status:'1'},
    {id: "4", customerid: '1234567', accountnumber: "5555", customername: 'martin',pan: '7777',cardtype:'mastercard',branchsol:'10',branchname:'Agbara',datedispatched:'03/02/2021',status:'1'},
    {id: "5", customerid: '12345678', accountnumber: "5555", customername: 'job',pan: '77777',cardtype:'verve',branchsol:'05',branchname:'Berger',datedispatched:'04/02/2021',status:'0'},
    {id: "6", customerid: '123456789', accountnumber: "55555", customername: 'bayo',pan: '777777',cardtype:'visa',branchsol:'06',branchname:'CMS',datedispatched:'05/02/2021',status:'1'},
 
   ];
  
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(fb: FormBuilder){

    //   this.acknowledgeForm = fb.group({
    //     name: ["", Validators.required]
    // });
    
    const users = Array.from(this.ELEMENT_DATA);
    // Assign the data to the data source for the table to render
    
    this.dataSource = new MatTableDataSource(users);
     
    //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      
    this.dataSource.sort = this.sort;
    }
  
     ngOnInit() {
    // const users = Array.from(this.ELEMENT_DATA);
    // // Assign the data to the data source for the table to render
    
    // this.dataSource = new MatTableDataSource(users);
     
    // //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    //   this.dataSource.paginator = this.paginator;
      
    // this.dataSource.sort = this.sort;
    }
    
    applyFilter(filterValue: string) {
    
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    updateCheckedList(element)
    {      
     // alert();
      console.log('jakesi');
      console.log(element);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(element => this.selection.select(element));
         
      if (this.isAllSelected())
      alert(this.isallSelectedStatus);
    }
  }  
 
  export interface UserData {
    id: string;
    customerid: string;
    accountnumber: string;
    customername: string;
    pan: string;
    cardtype:string;
    branchsol:string;
    branchname:string;
    datedispatched:string
    status:string
  }
 
  
  /**  Copyright 2020 Google LLC. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */
  