import express from "express";
import { json } from "body-parser";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

export default app;
