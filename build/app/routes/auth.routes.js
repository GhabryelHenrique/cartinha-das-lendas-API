"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var autenticateToken_utils_1 = require("../utils/autenticateToken.utils");
var authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
//Routes
authRouter.get("/logout", autenticateToken_utils_1.authenticateToken, auth_controller_1.logout);
authRouter.post("/login", auth_controller_1.login);
authRouter.post("/register", auth_controller_1.criarUsuario);
authRouter.post("/refreshAccessToken", auth_controller_1.refreshAccessToken);
authRouter.put("/updateUser/{id}", autenticateToken_utils_1.authenticateToken, auth_controller_1.atualizarUsuario);
authRouter.delete("/deleteUser/{id}", autenticateToken_utils_1.authenticateToken, auth_controller_1.deletarUsuario);
authRouter.post("registerSuperAdmin", auth_controller_1.registerSuperAdmin);
