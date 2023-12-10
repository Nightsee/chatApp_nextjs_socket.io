const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require("cors");
const app = express();
const server = http.createServer(app)

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on('connection', (socket)=>{
    console.log(`new user is connected with id: ${socket.id}`);

    socket.on('message', (msg)=>{
        socket.broadcast.emit("message_recieve", msg)
    })
})


server.listen(9000, ()=>{
    console.log('server is running...')
})
