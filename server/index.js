const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, deleteUser, getUsers, getUsersInRoom} = require('./users')

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);

//fix CORS error
const corsOptions={
 cors: true,
 origins:["http://localhost:3000"],
}
const io = socketio(server, corsOptions);

io.on('connection', (socket) => {
    console.log("We have new connection");

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);
        const {error, user} = addUser({id: socket.id, name, room})
        
        if(error){
            return callback(error);
        }
        
        socket.emit('message', {user: 'admin', text: `Hello, ${user.name}, Welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined this room`})

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        console.log("$$$",socket.id, );
        console.log("%%%",message, );
        const user = getUsers(socket.id);
        console.log(user);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    })

    socket.on('disconnect', () => {
        console.log('user had left!');
    });
});

app.use(router);

server.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
});