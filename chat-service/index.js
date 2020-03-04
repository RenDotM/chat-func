const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
    console.log("New Connection Occurs!");

    socket.on('disconnect', () => {
        console.log("A User Left!");
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has Started on ${PORT}`));