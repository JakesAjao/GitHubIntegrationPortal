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
export class AcknowledgeComponent implements AfterViewInit  {

  
  acknowledgeForm: FormGroup;
  
  displayedColumns: string[] = ['id', 'name', 'progress', 'color','checked','actions'];
    dataSource: MatTableDataSource<UserData>;
    
  //displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  
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
    }
  
    ngAfterViewInit() {
    const users = Array.from(this.ELEMENT_DATA);
    // Assign the data to the data source for the table to render
    
    this.dataSource = new MatTableDataSource(users);
     
    //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      
    this.dataSource.sort = this.sort;
    }
    
  applyFilter(filterValue: string) {
   
     this.dataSource.filter = filterValue.trim().toLowerCase();

     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
    }
  }
  updateCheckedList(element)
  {
    console.log(element);
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
  