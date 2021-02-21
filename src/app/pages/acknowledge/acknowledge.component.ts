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
  
  displayedColumns: string[] = ['select','id', 'name', 'progress', 'color','checked','actions'];
    dataSource: MatTableDataSource<UserData>;
      
   ELEMENT_DATA: UserData[] = [
    {id: "1", name: 'Hydrogen', progress: "1.0079", color: 'Hello'},
     {id: "2", name: 'H2', progress: "1.0079", color: 'Lol'},
     {id: "3", name: 'Baba', progress: "1.2", color: 'Yellow'},
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
    name: string;
    progress: string;
    color: string;
  }
  
// const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
// 'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
// 'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
// 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

 
  // function createNewUser(id: number): UserData {
  //   const name =
  //       NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  //       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  
  //   return {
  //     id: id.toString(),
  //     name: name,
  //     progress: Math.round(Math.random() * 100).toString(),
  //     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  //   };
  // }
  
  /**  Copyright 2020 Google LLC. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */
  