import React from 'react'
import ScrollToBottm from 'react-scroll-to-bottom'
import './style.css'

export default function Messages({messages, name}) {

    const renderMessage = ({message : {name, text}, index}) => {
        let isSentByCurrentUser = false;
        const trimedName = name.trim().toLowerCase();

        if(name == trimedName){
            isSentByCurrentUser = true;
        }

        return (
            <div key={index}>
                {
                    isSentByCurrentUser ? 
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{trimedName}</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText">{text}</p>
                        </div>
                    </div>
                    :
                    <div className="messageContainer justifyStart">
                        <p className="sentText backgroundLight">{trimedName}</p>
                        <div className="messageBox">
                            <p className="messageText">{text}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
    return (
        <ScrollToBottm>
            {messages.map((message, index) => {
                renderMessage(message, index)
            })}
        </ScrollToBottm>    
    )
}
