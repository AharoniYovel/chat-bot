import express from 'express';
import httpServer from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors());

const http = httpServer.createServer(app);

http.listen(3000, () => {
    console.log('listening on :3000');
});

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('WebSoket connected!')
});


io.on('connection', (_socket) => {
    console.log({ new_connection: true, socketID: _socket.id });
    _socket.emit('new connection', 'new connection');

    _socket.on("chat", (_data) => {
        io.sockets.emit("chat", _data);
    })






});