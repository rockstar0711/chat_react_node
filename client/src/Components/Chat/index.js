import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import { ENDPOINT } from '../../Config/env'
import './style.css'
import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';

let socket;
export default function Chat ({location}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
            
        });

        // return () => {
        //     socket.emit('disconnect')
        //     socket.off();
        // }
    }, [ ENDPOINT, location.search ]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const onSendMessgage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} onSendMessgage={onSendMessgage} />
                
            </div>
        </div>
    )
}
