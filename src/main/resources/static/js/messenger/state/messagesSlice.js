import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import 'regenerator-runtime/runtime'

export const fetchMessages = createAsyncThunk('/messages/setMessages', async (contact) => {
    const response = await axios.get(`/api/participants/${contact}/messages`)
    return response.data
})

export const addMessageAsync = createAsyncThunk('/messages/addMessage', async (message) => {
    const response = await axios.post('/api/messages', message)
    return response.data
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        value: {
            type: 'fetching',
            messages: []
        }
    },
    reducers: {
        addMessage: (state, {payload}) => {
            state.type = 'add-single'
            state.messages = [...state.messages, payload]
        }
    },
    extraReducers: {
        [fetchMessages.fulfilled]: (state, {payload}) => {
            state.type = 'fetching'
            state.messages = payload
        },
        [addMessageAsync.fulfilled]: (state, {payload}) => {
            state.type = 'add-single'
            state.messages = [...state.messages, payload]
        }
    }
});

export const {addMessage} = messagesSlice.actions
export const selectMessages = (state) => state.messages.messages
export const selectMessageChangeType = (state) => state.messages.type

export default messagesSlice.reducer