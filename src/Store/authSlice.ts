
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  userName: string;
  email: string;
  isLoggedIn: boolean;
  userRole : string;
}

const initialState: AuthState = {
  userName: "",
  email: "",
  isLoggedIn: false,
  userRole : ""
};

const authSlice = createSlice({
   name : 'auth',
   initialState,
   reducers :  {
    setUserName : (state,action:PayloadAction<string>) =>{
      state.userName = action.payload;
    },
    setUserRole : (state, action:PayloadAction<string>) =>{
      state.userRole = action.payload;
    }
   }
})

export const { setUserName , setUserRole} = authSlice.actions;

export default authSlice.reducer;
