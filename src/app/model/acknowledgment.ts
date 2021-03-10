export interface UserData {
    id: number;
    customerid: string;
    accountnumber: string;
    customername: string;
    pan: string;
    cardtype:string;
    branchsol:string;
    branchname:string;
    datedispatched:string
    status:boolean;
    
    emailNotificationStatus:string
    acknowledgedStatus:boolean;
    //activationStatus:boolean
    //pickupStatus:boolean
    //dateAcknowledged:string;
    //dateActivation:string
    //dateOfpickup:string
  }
  export class User implements UserData {
    public id: number;
    public customerid: string;
    public accountnumber: string;
    public customername: string;
    public pan: string;
    public cardtype:string;
    public branchsol:string;
    public branchname:string;
    public datedispatched:string
    public status:boolean;
    
    public emailNotificationStatus:string
    public acknowledgedStatus:boolean;

    constructor(
      // id:number,
      // customerid: string,
      // accountnumber: string,
      // customername: string,
      // pan: string,
      // cardtype:string,
      // branchsol:string,
      // branchname:string,
      // datedispatched:string,
      // status:boolean,
      
      // emailNotificationStatus:string,
      // acknowledgedStatus:boolean
    ) {
      // this.id=id,
      // this.customerid=customerid,
      // this.accountnumber=accountnumber,
      // this.customername=customername,
      // this.pan=pan,
      // this.cardtype=cardtype,
      // this.branchsol=branchsol,
      // this.branchname=branchname,
      // this.datedispatched=datedispatched,
      // this.status=status,
      
      // this.emailNotificationStatus=emailNotificationStatus,
      // this.acknowledgedStatus=acknowledgedStatus
    }
  
}