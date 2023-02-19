import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import playersModels from "../models/players.models";
import usersModels from "../models/users.model";
import superAdminModels from "../models/superAdmin.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateTokens } from "../utils/autenticateToken.utils";

dotenv.config();


export const criarUsuario = async (req: Request, res: Response) => {
    const { name, email, nickname, password, avatar, birthDate } = req.body;

    const isUserExist = await usersModels.findOne({email: email})

    if(isUserExist) return res.status(400).json({ message: "Usuário já existe" });

    const saltRounds = 32;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new usersModels({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        nickname,
        password: hashedPassword,
        avatar,
        birthDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        ratings: []
})

    try {
        const novoUser = await user.save();
        return res.status(201).json({ messagem: "Usuário criado com sucesso", data: novoUser });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
    const { name, nickname, password, avatar, birthDate} = req.body;

    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "ID não informado" });

    const saltRounds = 32;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = usersModels.findByIdAndUpdate(id, {
        name,
        nickname,
        password: hashedPassword,
        avatar,
        birthDate,
        updatedAt: new Date()
    }, {new: true})
    
    try {
        const userAtualizado = await user;
        return res.status(201).json({ messagem: "Usuário atualizado com sucesso", data: userAtualizado });
    }
    catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "ID não informado" });

    const user = await usersModels.findByIdAndDelete(id)

    try {
        return res.status(201).json({ messagem: "Usuário deletado com sucesso" });
    }
    catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await usersModels.findOne({email: email})

    if(!user) return res.status(400).json({ message: "Usuário não existe" });

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if(!isPasswordCorrect) return res.status(400).json({ message: "Senha incorreta" });
    
    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // tempo de vida de 7 dias
        });

    return res.status(200).json({ message: "Login realizado com sucesso", accessToken });

};

export const refreshAccessToken = (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, payload: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
      });
      res.json({ accessToken });
    });
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logout realizado com sucesso" });
}

export const registerSuperAdmin = async (req: Request, res: Response) => {
    const { name, email, password, } = req.body;

    const isAvaibleSuperUser = await superAdminModels.find()

    if(isAvaibleSuperUser.length > 0) return res.status(403).json({ message: "Super usuário já existe" });

    const saltRounds = 32;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const superUser = new superAdminModels({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    try {
        const novoSuperUser = await superUser.save();
        return res.status(201).json({ messagem: "Super usuário criado com sucesso", data: novoSuperUser });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export default { criarUsuario, atualizarUsuario, deletarUsuario, login, refreshAccessToken, logout, registerSuperAdmin };