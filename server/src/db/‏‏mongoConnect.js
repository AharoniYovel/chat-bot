import { connect } from 'mongoose';
import { dataHide } from "../config/secret.js";

main().catch(err => console.log(err));


async function main() {
    //                        <<<<<< connect to my ATLAS DB >>>>>>>>
    await connect(`mongodb+srv://${dataHide.name}:${dataHide.password}@cluster0.i9y4f.mongodb.net/chatBot`);
    console.log("mongo connect....to chatBot");
}