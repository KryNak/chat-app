import {MessageBubble} from "../MessageBubble/MessageBubble";
import {useDispatch, useSelector} from "react-redux";
import {addMessageAsync, selectMessageChangeType, selectMessages} from "../../state/messagesSlice";
import {Button} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {selectSelectedContact} from "../../state/selectedContactSlice";
import {useSpring, animated} from "react-spring";
import {ArrowBack} from "@mui/icons-material";

export function MessagesContainer() {

    const dispatch = useDispatch()
    const selectedContact = useSelector(selectSelectedContact)
    const messages = useSelector(selectMessages)
    const messageChangeType = useSelector(selectMessageChangeType)
    const pointerRef = useRef()

    const messagesStyle = {
        flex: '1 1 auto',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column'
    }

    useEffect(() => {
        if (pointerRef.current && messageChangeType === 'add-single') {
            pointerRef.current.scrollIntoView({behavior: 'smooth'})
        } else if (pointerRef.current && messageChangeType === 'fetching') {
            pointerRef.current.scrollIntoView({behavior: 'auto'})
        }

    }, [messages])

    function sendGreetMessage() {
        if (selectedContact.trim()) {
            dispatch(addMessageAsync({message: '👋', receiver: selectedContact}))
        }
    }

    const [flip, setFlip] = useState(false)
    const animationProps = useSpring({
        to: { transform: 'translate(20px)' },
        from: { transform: 'translate(-20px)' },
        reset: true,
        reverse: flip,
        delay: 100,
        config: {
            duration: 300
        },
        onRest: () => setFlip(!flip)
    })

    return (
        <div style={messagesStyle}>
            {
                messages && messages.length > 0
                    ? (
                        <>
                            {messages.map(e => {
                                return <MessageBubble key={e.id} message={e}/>
                            })}
                            <div ref={pointerRef}/>
                        </>
                    )
                    : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                            {
                                selectedContact.trim()
                                    ? (
                                        <Button onClick={sendGreetMessage} variant="outlined">Say hello 👋</Button>
                                    )
                                    : (
                                        <animated.div style={animationProps}>
                                            <Button disabled variant="outlined" startIcon={<ArrowBack/>}>
                                                Choose contact
                                            </Button>
                                        </animated.div>
                                    )
                            }
                        </div>
                    )
            }
        </div>
    )
}