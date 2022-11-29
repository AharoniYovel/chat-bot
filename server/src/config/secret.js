import { config } from "dotenv";
config();


export const dataHide = {
    name: process.env.NAME,
    password: process.env.PASSWORD,
    elasticApiKey: process.env.ELASTIC_API_KEY,
}