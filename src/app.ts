import express from "express";
import mongoose from "mongoose";
import { ratingPlayersRouter } from "./app/routes/ratingPlayers.routes";
import dotenv from "dotenv";
import { authRouter } from "./app/routes/auth.routes";
import { start } from "./app/utils/refreshRatings.utils";
dotenv.config();

export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
    this.connectDB();
    this.refreshRating()
  }

  private middleware(){
    this.server.use(express.json());
  }

  private connectDB(){
    // Connect to database
    mongoose.connect(process.env.MONGO_URL!).then(() => {
      console.log("Connected to database");
    }).catch((err: any) => {
      console.log("Error connecting to database", err);
    });
  }

  private refreshRating(){
    // Refresh ratings
    start();

  }

  private router(){
    this.server.use(ratingPlayersRouter);
    this.server.use(authRouter)
  }
}