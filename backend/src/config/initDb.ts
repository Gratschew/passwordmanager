import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
  } = process.env;

export async function initDb() {
    try {
        console.log("Connecting to mongodb...");
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`);
        console.log("Connected");
      } catch (err) {
        console.log(err);
        console.log("Unable to connect to database!");
        throw err;
      }
}

// old version of initDb function
/*export async function initDb() {
    try {
        console.log("Connecting to mongodb...");
        return mongoose
        .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`)
        .then(()=> {
            console.log("Connected");
            return Promise.resolve();
        })
        .catch((err)=>{
            console.log(err);
            console.log("Unable to connect to database!");
            return Promise.reject();
        })
    }
    catch (err) {
        console.log(err);
        return Promise.reject;
    }
}*/
