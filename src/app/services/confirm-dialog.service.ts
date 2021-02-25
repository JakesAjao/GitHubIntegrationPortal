import { Injectable } from '@angular/core';  
import { Router, NavigationStart } from '@angular/router';  
import { Observable } from 'rxjs';  
import { Subject } from 'rxjs';  
  
@Injectable() 
export class ConfirmDialogService {  
    private subject = new Subject<any>();  
  
    confirmThis(message: string, yesFn: () => void, noFn: () => void): any {  
        this.setConfirmation(message, yesFn, noFn);  
    }  
  
    setConfirmation(message: string, yesFn: () => void, noFn: () => void): any { 
        debugger ;
        const that = this;  
        this.subject.next({  
            type: 'confirm',  
            text: message,  
            yesFn(): any {   
               
                    yesFn(); 
                    
                   that.subject.next(); // This will close the modal
                },  
            noFn(): any {  
                noFn(); 
                
                that.subject.next();   
            }  
        });  
  
    }  
  
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
    }  
}  