interface User {
    id : string,
    username : string,
    password : string,
    avartar : string ,
    fullname : string,
    role : string
}


 export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  
 export type AuthActionPayload = {email : string , password : string , remember? : boolean};
  
  // Define action types
  type AuthAction =
    | { type: 'auth/login'; payload: AuthActionPayload }
    | { type: 'auth/logout' };
  
 export   interface LoginFormValues {
        email: string;
        password: string;
        remember?: boolean;
      }