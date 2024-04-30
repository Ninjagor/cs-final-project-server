import express from "express";
import { json } from "body-parser";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send("pong");
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

export default app;
