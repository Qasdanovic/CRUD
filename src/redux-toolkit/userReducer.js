import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "users",
    initialState : {
        value : []
    } ,
    reducers : {

        addUser : (state, action) => {
            state.value.push(action.payload)
        } ,

        deleteUser : (state, action) => {
            const filterUsers = state.value.filter(user => user.id !== action.payload)
            state.value = filterUsers
        } ,

        updateUser : (state, action) => {
            const newData = state.value.map(user => user.id === action.payload.id ? action.payload.newData : user)
            state.value = newData
        }
    }
})

export const { addUser, deleteUser, updateUser } = userSlice.actions
export default userSlice.reducer