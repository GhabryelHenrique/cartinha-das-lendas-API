"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingPlayersRouter = void 0;
var express_1 = require("express");
var ratingPlayers_controllers_1 = require("../controllers/ratingPlayers.controllers");
var ratingPlayersRouter = (0, express_1.Router)();
exports.ratingPlayersRouter = ratingPlayersRouter;
var autenticateToken_utils_1 = require("../utils/autenticateToken.utils");
//Routes
ratingPlayersRouter.post("/createRatingPlayers", autenticateToken_utils_1.authenticateToken, ratingPlayers_controllers_1.criarPlayer);
ratingPlayersRouter.put("/updateRatingPlayers/{id}", autenticateToken_utils_1.authenticateToken, ratingPlayers_controllers_1.atualizarPlayer);
ratingPlayersRouter.post("/sendPlayerRating/{id}", autenticateToken_utils_1.authenticateToken, ratingPlayers_controllers_1.atualizarPlayer);
