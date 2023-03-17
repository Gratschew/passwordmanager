import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initDb } from './config/initDb';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('The Beginnings');
});

initDb().then(()=>{
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch(()=>{
  console.log("not listening")
})
