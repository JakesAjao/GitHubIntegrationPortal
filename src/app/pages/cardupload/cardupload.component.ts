import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreditCardServices } from 'app/services/creditcardServices';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cardupload',
  templateUrl: './cardupload.component.html',
  styleUrls: ['./cardupload.component.scss']
})
export class CarduploadComponent implements OnInit {
  //@ViewChild('UploadFileInput', { static: false })
  //uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  token:string;
  
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('uploadFileInput') uploadFileInput: ElementRef;
  isExcelFile: boolean;


  constructor(
    private formBuilder: FormBuilder,private toastr: ToastrService,private SpinnerService: NgxSpinnerService,
    private creditcardService: CreditCardServices,) {      
      
     }

  ngOnInit(): void {
    
    (document.getElementById('button') as HTMLInputElement).disabled = false;
    
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.token = localStorage.getItem('token');
  }
  onFileSelect(event) {
    
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!_.includes(af, file.type)) {
        this.creditcardService.showFailure('Oops! Only Excel Document is Allowed.','CardUpload Notification.');
      } else {
        
      this.SpinnerService.show();
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);        
        this.onChange(event);
      }
    }
  }
    onFormSubmit(){
      this.SpinnerService.show();
      if (!this.fileUploadForm.get('myfile').value) {
        this.creditcardService.showFailure('Oops! Please fill valid details.','CardUpload Notification.');
        this.SpinnerService.hide();
        return false;
      }  
      const formData = new FormData();
      formData.append('formFile', this.fileUploadForm.get('myfile').value);

      this.creditcardService.uploadCard(formData,this.token).subscribe(
        (response)=>{
         console.log("Response: " + JSON.stringify(response));
         let msg = response.message;      
         if (response.statusCode === "00") {          
          this.creditcardService.showSuccess('Wow! '+msg+".",'CardUpload Notification.');
          this.uploadFileInput.nativeElement.value = "";
          
        (document.getElementById('button') as HTMLInputElement).disabled = true;
        this.SpinnerService.hide(); 
        }   
         return msg;           
         },
         error => {
          console.log('Upload failed: '+JSON.parse(error));
          this.creditcardService.showFailure('Oops! Upload failed. ','CardUpload Notification.');
          
        (document.getElementById('button') as HTMLInputElement).disabled = true;
        this.SpinnerService.hide(); 
        });               
      }
    
      onChange(evt) {        
      this.SpinnerService.show();
        let data, header;
        const target: DataTransfer = <DataTransfer>(evt.target);
        this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
        if (target.files.length > 1) {
          this.uploadFileInput.nativeElement.value = '';
        }
        if (this.isExcelFile) {
          this.spinnerEnabled = true;
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    
            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    
            /* save data */
            data = XLSX.utils.sheet_to_json(ws);
          };
    
          reader.readAsBinaryString(target.files[0]);
    
          reader.onloadend = (e) => {
            //this.spinnerEnabled = false;            
            this.SpinnerService.hide();            
          (document.getElementById('button') as HTMLInputElement).disabled = false;
            this.keys = Object.keys(data[0]);
            this.dataSheet.next(data)
          }          
        } 
        else {
          this.uploadFileInput.nativeElement.value = '';          
         this.SpinnerService.hide();
        }        
      }      
}

