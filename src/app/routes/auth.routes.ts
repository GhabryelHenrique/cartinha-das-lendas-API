import { Router } from "express";
import {
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  login,
  refreshAccessToken,
  logout,
  registerSuperAdmin,
} from "../controllers/auth.controller";
import { authenticateToken } from "../utils/autenticateToken.utils";
const authRouter: Router = Router();

//Routes
authRouter.get("/logout", authenticateToken, logout);
authRouter.post("/login", login);
authRouter.post("/register", criarUsuario);
authRouter.post("/refreshAccessToken", refreshAccessToken);
authRouter.put("/updateUser/{id}", authenticateToken, atualizarUsuario);
authRouter.delete("/deleteUser/{id}", authenticateToken, deletarUsuario);
authRouter.post("registerSuperAdmin", registerSuperAdmin);

export { authRouter };
