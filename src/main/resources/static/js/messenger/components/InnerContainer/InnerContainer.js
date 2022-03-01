import {Chat} from "../Chat/Chat";
import {ContactList} from "../ContactList/ContactList";
import {Divider, Paper} from "@mui/material";
import {useRef} from "react";

export function InnerContainer() {

    const sendButtonRef = useRef()

    const innerContainerStyle = {
        minWidth: '740px',
        minHeight: '500px',
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row'
    }

    return (
        <Paper sx={innerContainerStyle} variant={"outlined"}>
            <ContactList sendButtonRef={sendButtonRef}/>
            <Divider orientation="vertical"/>
            <Chat messageInputRef={sendButtonRef}/>
        </Paper>
    )
}