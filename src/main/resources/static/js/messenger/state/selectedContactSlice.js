import {createSlice} from "@reduxjs/toolkit";

const selectedContactSlice = createSlice({
    name: 'selectedContact',
    initialState: {
        value: ''
    },
    reducers: {
        setSelectedContact: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {setSelectedContact} = selectedContactSlice.actions

export const selectSelectedContact = (state) => state.selectedContact.value

export default selectedContactSlice.reducer

export class selectSele {
}