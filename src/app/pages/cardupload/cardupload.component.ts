import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcknowledgmentService } from 'app/services/acknowledgment.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-cardupload',
  templateUrl: './cardupload.component.html',
  styleUrls: ['./cardupload.component.scss']
})
export class CarduploadComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  token:string;
  constructor(private acknowledgeService: AcknowledgmentService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.token = localStorage.getItem('token');
  }
  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }
  }
    onFormSubmit(){
      if (!this.fileUploadForm.get('myfile').value) {
        alert('Please fill valid details!');
        return false;
      }
  
      const formData = new FormData();
      formData.append('formFile', this.fileUploadForm.get('myfile').value);
      //formData.append('agentId', '007');
  
      this.acknowledgeService.uploadCard(formData,this.token).subscribe(
        (response)=>{
         console.log("Response: " + JSON.stringify(response));
         let msg = response.message;          
         console.log('cardObjData: '+msg); 
         if (response.statusCode === "00") {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
   
         return msg;           
         },
         error => {
          console.log(error);
        });
        
      }
  }

