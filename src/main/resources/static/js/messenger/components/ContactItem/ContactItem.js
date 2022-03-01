import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectSelectedContact} from "../../state/selectedContactSlice";

export function ContactItem({user, onClick}) {

    const selectedContact = useSelector(selectSelectedContact)

    const listButtonStyle = {
        borderRadius: '10px'
    }

    return (
        <ListItem onClick={e => onClick(user.username)} alignItems="flex-start">
            <ListItemButton selected={user.username === selectedContact} sx={listButtonStyle}>
                <ListItemAvatar>
                    <Avatar alt={user.username}>{user.username.substring(0, 2).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username}/>
            </ListItemButton>
        </ListItem>
    )
}