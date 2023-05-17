import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initDb } from './config/initDb';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit'
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message:
		{message: 'Too many requests, try again later'},
});

// set rate limiter on login and 2fa verification API-endpoints
app.use('/auth/login', limiter);
app.use('/auth/verifyTwoFa', limiter);

app.use('/', routes);
initDb().then(()=>{
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch(()=>{
  console.log("not listening")
})