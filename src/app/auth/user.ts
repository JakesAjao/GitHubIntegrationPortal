export interface User {
    userName: string;
    password: string;
  }
  export interface UserResponse {
    email: string;
    groups:string;
    department:string;
    displayName:string;
    token:string;
  }
  export interface UserToken{
    userName:string
    userToken:string;
 }