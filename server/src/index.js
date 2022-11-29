import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import "./db/‏‏mongoConnect.js";
import { MessageModel } from './model/messageModel.js';

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

app.get("/", (req, res) => {
    res.send("Server Open")
})



let currtentID = 0;

io.on('connection', (_socket) => {
    console.log({ new_connection: true, socketID: _socket.id });
    console.log(currtentID);

    _socket.on("chat", async (_msg) => {

        let chatQuestion = (_msg.question).toLowerCase();

        try {
            let exsist = await MessageModel.findOne({ question: chatQuestion });
            if (exsist === null) {
                await addNewQuestion(chatQuestion);
                console.log("add new question");
                _sendNewQuestion();
            } else {
                _sendAnswers(exsist.answers);
            }

        } catch (err) {
            console.log(err);
        }
    })

    const _sendNewQuestion = () => {
        _socket.emit("doesntKnow", { message: "Its a new question for my knowledge, pls help me to be smarter and give me 2 answers for your question" });
    }


    _socket.on("reciveFirstAns", async (_msg) => {
        console.log(_msg, "reciveFirstAns");
        await addFirstAnsToDB(_msg.question);
        _socket.emit("okFirstAns", "Got it, and the second one?");

    })

    _socket.on("reciveSecondAns", async (_msg) => {
        console.log(_msg, "reciveSecondeAns");
        await addSecondAnsToDB(_msg.question);
        _socket.emit("okSecondAns", `Perfect, now i'm smarter :)`);
    })


    const _sendAnswers = (_answers) => {
        console.log(_answers);
        _socket.emit("respAnswers", {
            status: 200,
            message: _answers
        })
    }


    _socket.on("disconnect", (_msg) => {
        console.log({ socketID: _socket.id, disconnect: true });
    })


});

const addFirstAnsToDB = async (_firstAns) => {
    let firstAns = await MessageModel.updateOne({ short_id: ++currtentID }, { $push: { answers: _firstAns } });
    console.log(firstAns);

}

const addSecondAnsToDB = async (_secondAns) => {
    let secondAns = await MessageModel.updateOne({ short_id: currtentID }, { $push: { answers: _secondAns } });
    console.log(secondAns);

}

const addNewQuestion = async (_newQ) => {
    let newQ = new MessageModel();
    newQ.question = _newQ;
    newQ.short_id = await genShortId(MessageModel);

    await newQ.save();
}

//* Gen short id by max+1 id in DB
const genShortId = async (_model) => {
    let data = await _model.find({}, { _id: 0, short_id: 1 });
    if (data.length <= 0) {
        return 1;
    }

    let max = 0;
    data.forEach(item => {
        if (item.short_id > max) {
            max = item.short_id;
        }
    });

    return max + 1;
}