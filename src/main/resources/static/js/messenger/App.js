import {OuterContainer} from "./components/OuterContainer/OuterContainer";
import {useDispatch, useSelector} from "react-redux";
import SockJsClient from 'react-stomp'
import {addMessage} from "./state/messagesSlice";
import {selectSelectedContact} from "./state/selectedContactSlice";
import {addContact} from "./state/contactsSlice";

export function App() {

    const dispatch = useDispatch()
    const selectedContact = useSelector(selectSelectedContact)

    function onMessage(msg){
        if(msg.type === 'USER'){
            dispatch(addContact(msg))
        }
        else if(msg.type === 'MESSAGE' && selectedContact === msg.sender.username){
            dispatch(addMessage(msg))
        }
    }

    return (
        <>
            <SockJsClient url={'/websocket'} on topics={['/secured/user/queue/message-callback', '/topic/new-user']} onMessage={onMessage}/>
            <OuterContainer/>
        </>
    )
}