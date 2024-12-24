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
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions
export default userSlice.reducer