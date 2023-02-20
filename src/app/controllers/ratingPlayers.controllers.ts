import { Request, Response } from "express";
import mongoose from "mongoose";
import playersModels from "../models/players.models";
import usersModels from "../models/users.model";

export const criarPlayer = async (req: Request, res: Response) => {
  const { name, nickname, age, position, rating, team, variation } = req.body;

  const isPlayerExist = await playersModels.findOne({nickname: nickname})

  if(isPlayerExist) return res.status(400).json({ message: "Jogador já existe" });

  const player = new playersModels({
    _id: new mongoose.Types.ObjectId(),
    name,
    nickname,
    age,
    position,
    rating,
    team,
    variation,
    lastUpdate: new Date(),
    history: [
      {
        date: new Date(),
        rating,
        variation,
      },
    ],
  });

  try {
    const novoPlayer = await player.save();
    return res
      .status(201)
      .json({ messagem: "Cartinha criada com sucesso", data: novoPlayer });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const atualizarPlayer = async (req: Request, res: Response) => {
  const { name, nickname, age, position, rating, team, variation, history } =
    req.body;
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "ID não informado" });

  const player = {
    name,
    nickname,
    age,
    position,
    rating,
    team,
    variation,
    lastUpdate: new Date(),
    history: [
      ...history,
      {
        date: new Date(),
        rating,
        variation,
      },
    ],
  };

  try {
    const playerAtualizado = playersModels.findByIdAndUpdate(id, player, {
      new: true,
    });
    return res
      .status(200)
      .json({
        messagem: "Cartinha atualizada com sucesso",
        data: playerAtualizado,
      });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const sendPlayerRating = async (req: Request, res: Response) => {
    const { rating, user, userEmail } = req.body;
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "ID não informado" });

    const userObject = await usersModels.findOne({ email: userEmail }) || new usersModels();
    const playerObject = await playersModels.findById(id);

    if (!playerObject) return res.status(400).json({ message: "Jogador não encontrado" });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    if(userObject.email !== userEmail) return res.status(400).json({ message: "Usuário não encontrado" });

    userObject.ratings.forEach((rating) => {
        if(rating.player === playerObject.nickname) {
          return res.status(400).json({ message: "Já foi enviado um rating para esse jogador" });
        }
    })

    const player = {
        date: new Date(),
        rating,
        userEmail,
        user,
    }

    try {
        const enviarRating = await playersModels.findByIdAndUpdate(id, {
            $push: {
                chatRatings: player
            }
        }, { new: true })

        usersModels.findByIdAndUpdate(userObject!._id, {
            $push: {
                ratings: {
                    player: enviarRating!.nickname,
                    rating: enviarRating!.rating,
                    date: new Date()
                }
        }}
        )

        return res.status(200).json({message: "Rating enviado com sucesso", data: enviarRating})

    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
}

export default { criarPlayer, atualizarPlayer, sendPlayerRating };
