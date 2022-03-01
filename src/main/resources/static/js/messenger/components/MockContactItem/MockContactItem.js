import {ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton} from "@mui/material";
import React from "react";

export function MockContactItem() {

    const listButtonStyle = {
        borderRadius: '10px'
    }

    return (
        <ListItem alignItems="flex-start">
            <ListItemButton sx={listButtonStyle}>
                <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} animation={'wave'} />
                </ListItemAvatar>
                <ListItemText primary={<Skeleton variant={"text"}/>}/>
            </ListItemButton>
        </ListItem>
    )
}