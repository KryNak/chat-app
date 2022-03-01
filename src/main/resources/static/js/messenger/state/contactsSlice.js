import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'regenerator-runtime/runtime'
import axios from "axios";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    const response = await axios.get('/api/contacts')
    return response.data
})

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        isLoaded: false
    },
    reducers: {
        addContact: (state, {payload}) => {
            state.contacts = [...state.contacts, payload]
        }
    },
    extraReducers: {
        [fetchContacts.pending]: (state) => {
            state.isLoaded = true
        },
        [fetchContacts.fulfilled]: (state, {payload}) => {
            state.isLoaded = false
            state.contacts = payload
        }
    }
});

export const {addContact} = contactsSlice.actions
export const selectContacts = (state) => state.contacts.contacts
export const selectIsLoaded = (state) => state.contacts.isLoaded

export default contactsSlice.reducer