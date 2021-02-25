import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';  
import { BrowserModule } from '@angular/platform-browser';  
import { CommonModule } from '@angular/common';  
  
import {ConfirmDialogComponent} from './confirm-dialog.component';  
import { ConfirmDialogService } from 'app/services/confirm-dialog.service'; 
  
@NgModule({  
    declarations: [  
        ConfirmDialogComponent  
    ],  
    imports: [  
        BrowserModule,  
        CommonModule  
    ],  
    exports: [  
        ConfirmDialogComponent  
    ],  
    entryComponents: [ConfirmDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [  
       ConfirmDialogService  
    ]  
})  
export class ConfirmDialogModule  
{  
} 