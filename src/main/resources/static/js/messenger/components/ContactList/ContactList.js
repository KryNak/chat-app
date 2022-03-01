import {List, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {ContactItem} from "../ContactItem/ContactItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchContacts, selectContacts, selectIsLoaded} from "../../state/contactsSlice";
import {contactListStyle} from "./style";
import {fetchMessages} from "../../state/messagesSlice";
import {setSelectedContact} from "../../state/selectedContactSlice";
import {PersonSharp} from "@mui/icons-material";
import {MockContactItem} from "../MockContactItem/MockContactItem";

export function ContactList({sendButtonRef}) {

    const dispatch = useDispatch()
    const contacts = useSelector(selectContacts)
    const isLoading = useSelector(selectIsLoaded)

    useEffect(() => {
        dispatch(fetchContacts())
    }, [])

    function handleContactSelect(username) {
        dispatch(setSelectedContact(username))
        dispatch(fetchMessages(username))
        sendButtonRef.current.value = ''
    }

    const noContactsStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '200px',
        height: '100%',
        flexDirection: 'column'

    }

    return (
        <div style={contactListStyle}>
            {
                contacts && contacts.length > 0 || isLoading
                    ? (
                        isLoading
                            ? (
                                <List sx={{width: '100%', maxWidth: 360}}>
                                    {Array.from(Array(10).keys()).map((val, index) => {
                                        return (
                                            <MockContactItem key={index}/>
                                        )
                                    })}
                                </List>
                            )
                            : (
                                <List sx={{width: '100%', maxWidth: 360}}>
                                    {contacts.map(e => {
                                        return (
                                            <ContactItem onClick={handleContactSelect} key={e.username} user={e}/>
                                        )
                                    })}
                                </List>
                            )
                    )
                    : (
                        <div style={noContactsStyle}>
                            <>
                                <PersonSharp sx={{fontSize: 50}}/>
                                <Typography>You have no contacts</Typography>
                            </>
                        </div>
                    )
            }
        </div>
    )
}