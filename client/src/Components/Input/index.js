import React from 'react'
import './style.css'

export default function Input({message, setMessage, onSendMessgage}) {
    return (
        <form className="form">
            <input  
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value) } 
                onKeyPress={event => event.key === 'Enter' ? onSendMessgage(event) : null}
            />
            <button className="sendButton" onClick={(event) => onSendMessgage(event)}>Send</button>
        </form>
    )
}
