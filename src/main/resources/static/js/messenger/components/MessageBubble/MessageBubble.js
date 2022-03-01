import {messageBoxRight, messageBoxLeft} from "./style";
import {Typography} from "@mui/material";

export function MessageBubble({message}) {

    return (
        <div style={message.sender.username === user ? messageBoxLeft : messageBoxRight}>
            <Typography>{message.message}</Typography>
        </div>
    )

}