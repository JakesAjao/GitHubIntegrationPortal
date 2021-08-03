import { ToastrService } from "ngx-toastr";

interface Notify{
    showSuccess(header:string,message:string);
    showFailure(header:string,message:string);
}

export class NotifyMe implements Notify{
   public toaster:ToastrService = null;

    constructor(private _toastr:ToastrService){
        this.toaster = _toastr;
    }
    
showSuccess(header:string,message:string) {
    this.toaster.success(header, message);
  }
showFailure(header:string,message:string) {
    this.toaster.error(header, message);
  }
}