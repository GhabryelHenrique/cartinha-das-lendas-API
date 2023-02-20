import { Router } from "express";
import { criarPlayer, atualizarPlayer } from "../controllers/ratingPlayers.controllers";
const ratingPlayersRouter: Router = Router()
import { authenticateToken } from "../utils/autenticateToken.utils";

//Routes
ratingPlayersRouter.post("/createRatingPlayers",authenticateToken, criarPlayer)
ratingPlayersRouter.put("/updateRatingPlayers/{id}",authenticateToken,  atualizarPlayer)
ratingPlayersRouter.post("/sendPlayerRating/{id}", authenticateToken, atualizarPlayer)

export { ratingPlayersRouter };