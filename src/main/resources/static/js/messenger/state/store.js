import {configureStore} from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice"
import messagesReducer from "./messagesSlice"
import selectedContactReducer from "./selectedContactSlice"

export default configureStore({
    reducer: {
        contacts: contactsReducer,
        messages: messagesReducer,
        selectedContact: selectedContactReducer
    }
})