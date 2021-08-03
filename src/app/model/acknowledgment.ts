
export interface UserData {
    id: number;
    name: string;
    description: string;
  }
  export class User implements UserData {
    public id: number;
    public name: string;
    public description: string;

    constructor() { }
  
}
export class UserDetails{
  public id: number;
  public name: string;
  public description: string;
   constructor(
    ){    
  }
}
