import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initDb } from './config/initDb';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/', routes);
initDb().then(()=>{
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch(()=>{
  console.log("not listening")
})