import express, { response } from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import axios from 'axios'


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



io.on('connection', (_socket) => {
    console.log({ new_connection: true, socketID: _socket.id });


    _socket.on("chat", (_msg) => {

        // `https://chatbot-api.vercel.app/api/?message=${_msg}`




        // ! rude bot / stupid

        // const options = {
        //     method: 'GET',
        //     url: 'https://aeona3.p.rapidapi.com/',
        //     params: { text: _msg },
        //     headers: {
        //         'X-RapidAPI-Key': '9d7787685fmshee2b7c0c159ce0cp1d757ejsn12d6f00abcfd',
        //         'X-RapidAPI-Host': 'aeona3.p.rapidapi.com'
        //     }
        // };



        // * nice bot

        const options = {
            method: 'GET',
            url: `https://chatbot-api.vercel.app/api/?message=${_msg}`,
            headers: {
                'X-RapidAPI-Key': '9d7787685fmshee2b7c0c159ce0cp1d757ejsn12d6f00abcfd',
                'X-RapidAPI-Host': 'chatbot-chatari.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            // _resp = response.data;
            console.log(response.data);
            _sendAnswer({
                status: response.status,
                botResp: response.data,
            });
        })


            .catch(function (err) {
                console.log(err);
                _errAnswer()
            });









    })

    const _sendAnswer = (_resp) => {
        _socket.emit("respAnswer", _resp);
    }

    const _errAnswer = () => {
        _socket.emit("respAnswer", {
            status: 404,
            _errAnswer: `I cant answer you because i have server problem... i'm a bot :( , try to refresh or come back later... , sorry `
        })
    }

    _socket.on("disconnect", (_msg) => {
        console.log({ socketID: _socket.id, disconnect: true });
    })


});