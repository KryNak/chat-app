import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import {SendRounded} from "@mui/icons-material";
import {MessagesContainer} from "../MessagesContainer/MessagesContainer";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedContact} from "../../state/selectedContactSlice";
import {addMessageAsync} from "../../state/messagesSlice";
import {LogoutBar} from "../Navbar/LogoutBar";

export function Chat({messageInputRef}) {

    const dispatch = useDispatch()
    const selectedContact = useSelector(selectSelectedContact)

    const chatStyle = {
        flex: '3 1 auto',
        display: 'flex',
        flexDirection: 'column'
    }

    const textAreaStyle = {
        minHeight: '50px',
        flex: '0 1 auto'
    }

    const inputStyle = {
        width: '100%',
        height: '100%',
        borderBottom: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        paddingLeft: '5px',
        paddingRight: '5px',
        borderBottomRightRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

    function sendMessage(){
        const message = messageInputRef.current.value.trim()
        if(message && selectedContact.trim()){
            dispatch(addMessageAsync({message: message, receiver: selectedContact}))
        }
        messageInputRef.current.value = ''
    }

    function onKeyDown(e){
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    return (
        <div style={chatStyle}>
            <LogoutBar/>
            <MessagesContainer/>
            <div style={textAreaStyle}>
                <Paper variant={'outlined'} square sx={inputStyle}>
                    <InputBase disabled={!selectedContact} onKeyDown={onKeyDown} inputRef={messageInputRef} sx={{width: '100%', height: '100%'}}/>
                    <Divider sx={{ height: 32, m: 0.5 }} orientation="vertical" />
                    <IconButton disabled={!selectedContact} onClick={sendMessage} color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <SendRounded/>
                    </IconButton>
                </Paper>
            </div>
        </div>
    )

}