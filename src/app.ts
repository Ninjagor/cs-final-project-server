import express from "express";
import { json } from "body-parser";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());


export default app;
