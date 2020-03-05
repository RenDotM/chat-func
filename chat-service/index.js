const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUserInRoom} = require('./user.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
    socket.on('join', ({name, room}, callback) =>{
        const {error, user} = addUser({ id:socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user:'amin', text:`${user.name}, welcome to the roome ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user:'admin', text: `${user.name}, has joined`});

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user:user.name, text:message});

        callback();
    });

    socket.on('disconnect', () => {
        console.log("A User Left!");
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has Started on ${PORT}`));