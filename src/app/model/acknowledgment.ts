
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
    activationStatus:boolean
    pickupstatus:boolean
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
    public activationStatus:boolean;
    public pickupstatus:boolean;

    constructor() { }
  
}
export class CardData{
  public sno:number;
  public customerid;
  public acknowledgedStatus:boolean;
  public activationStatus:boolean;
  public pickupstatus:boolean;

   constructor(
    ){    
  }
}
