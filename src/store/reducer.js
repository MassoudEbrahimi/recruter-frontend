import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    role: "",
    accessibility:{},
    sidebar:null
}

//Todo Test Redux Sample After Connect To Auth Service swap with ContextApi
export const authSlice = createSlice({
    name:"authenticate",
    initialState,
    reducers:{
        userRole : (state , action)=>{
            state[`role`] = action.payload
        },
        accessibility : (state , action)=>{
            state[`accessibility`] = action.payload
        },
        handleSidePanel : (state , action)=>{
            state[`sidebar`] = action.payload
        }
    }
})
export const {userRole ,accessibility , handleSidePanel } = authSlice.actions;
export default authSlice.reducer;