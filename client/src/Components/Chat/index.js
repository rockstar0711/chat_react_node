import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import { ENDPOINT } from '../../Config/env'

let socket;
export default function Chat ({location}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    useEffect(() => {
        const { room, name } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
    }, []);
    return (
        <div>
            chat
        </div>
    )
}
