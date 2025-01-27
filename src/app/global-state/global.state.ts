export interface GlobalState {    
    isLoading: boolean;
  }
  
export const initialGlobalState: GlobalState = {  
  // here we can also add something like User data which can be part of the global state in a real Application 
    isLoading: false,
};