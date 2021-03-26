export interface BlankCard {
  id: number;
  carD_TYPE: string;
  batcH_NO: string;
  brancH_NAME: string;
  soL_ID: string;
  nO_OF_CARDS:string;
  datE_OF_DISPATCH:string;
  status:string;
  datedispatched:string  
  entrY_DATE:string
}
export class BlankCardImpl implements BlankCard {
  public id: number;
  public carD_TYPE: string;
  public batcH_NO: string;
  public brancH_NAME: string;
  public soL_ID: string;
  public nO_OF_CARDS:string;
  public datE_OF_DISPATCH:string;
  public status:string;
  public datedispatched:string  
  public entrY_DATE:string
  
  constructor() { }

}
export class BlankCardData{
  public id: number;
  public carD_TYPE: string;
  public soL_ID: string;
  public status:string;
}