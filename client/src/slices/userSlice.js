import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name : "",
  isLoggedIn : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setValue: (state,action)=>{
    state.name = action.payload;
    state.isLoggedIn = true;
   },
   handleLogOut2 :(state)=>{
    state.name = "";
    state.isLoggedIn = false;
   }
  },
})


export const { setValue , handleLogOut2} = userSlice.actions

export default userSlice.reducer