import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    short_id: Number,
    question: String,
    answers: Array
})

export const MessageModel = model("messages", messageSchema);