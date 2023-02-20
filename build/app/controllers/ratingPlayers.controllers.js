"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPlayerRating = exports.atualizarPlayer = exports.criarPlayer = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var players_models_1 = __importDefault(require("../models/players.models"));
var users_model_1 = __importDefault(require("../models/users.model"));
var criarPlayer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, nickname, age, position, rating, team, variation, isPlayerExist, player, novoPlayer, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, nickname = _a.nickname, age = _a.age, position = _a.position, rating = _a.rating, team = _a.team, variation = _a.variation;
                return [4 /*yield*/, players_models_1.default.findOne({ nickname: nickname })];
            case 1:
                isPlayerExist = _b.sent();
                if (isPlayerExist)
                    return [2 /*return*/, res.status(400).json({ message: "Jogador já existe" })];
                player = new players_models_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    name: name,
                    nickname: nickname,
                    age: age,
                    position: position,
                    rating: rating,
                    team: team,
                    variation: variation,
                    lastUpdate: new Date(),
                    history: [
                        {
                            date: new Date(),
                            rating: rating,
                            variation: variation,
                        },
                    ],
                });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, player.save()];
            case 3:
                novoPlayer = _b.sent();
                return [2 /*return*/, res
                        .status(201)
                        .json({ messagem: "Cartinha criada com sucesso", data: novoPlayer })];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.criarPlayer = criarPlayer;
var atualizarPlayer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, nickname, age, position, rating, team, variation, history, id, player, playerAtualizado;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, nickname = _a.nickname, age = _a.age, position = _a.position, rating = _a.rating, team = _a.team, variation = _a.variation, history = _a.history;
        id = req.params.id;
        if (!id)
            return [2 /*return*/, res.status(400).json({ message: "ID não informado" })];
        player = {
            name: name,
            nickname: nickname,
            age: age,
            position: position,
            rating: rating,
            team: team,
            variation: variation,
            lastUpdate: new Date(),
            history: __spreadArray(__spreadArray([], history, true), [
                {
                    date: new Date(),
                    rating: rating,
                    variation: variation,
                },
            ], false),
        };
        try {
            playerAtualizado = players_models_1.default.findByIdAndUpdate(id, player, {
                new: true,
            });
            return [2 /*return*/, res
                    .status(200)
                    .json({
                    messagem: "Cartinha atualizada com sucesso",
                    data: playerAtualizado,
                })];
        }
        catch (err) {
            return [2 /*return*/, res.status(400).json({ message: err.message })];
        }
        return [2 /*return*/];
    });
}); };
exports.atualizarPlayer = atualizarPlayer;
var sendPlayerRating = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, user, userEmail, id, userObject, playerObject, player, enviarRating, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, user = _a.user, userEmail = _a.userEmail;
                id = req.params.id;
                if (!id)
                    return [2 /*return*/, res.status(400).json({ message: "ID não informado" })];
                return [4 /*yield*/, users_model_1.default.findOne({ email: userEmail })];
            case 1:
                userObject = (_b.sent()) || new users_model_1.default();
                return [4 /*yield*/, players_models_1.default.findById(id)];
            case 2:
                playerObject = _b.sent();
                if (!playerObject)
                    return [2 /*return*/, res.status(400).json({ message: "Jogador não encontrado" })];
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "Usuário não encontrado" })];
                if (userObject.email !== userEmail)
                    return [2 /*return*/, res.status(400).json({ message: "Usuário não encontrado" })];
                userObject.ratings.forEach(function (rating) {
                    if (rating.player === playerObject.nickname) {
                        return res.status(400).json({ message: "Já foi enviado um rating para esse jogador" });
                    }
                });
                player = {
                    date: new Date(),
                    rating: rating,
                    userEmail: userEmail,
                    user: user,
                };
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, players_models_1.default.findByIdAndUpdate(id, {
                        $push: {
                            chatRatings: player
                        }
                    }, { new: true })];
            case 4:
                enviarRating = _b.sent();
                users_model_1.default.findByIdAndUpdate(userObject._id, {
                    $push: {
                        ratings: {
                            player: enviarRating.nickname,
                            rating: enviarRating.rating,
                            date: new Date()
                        }
                    }
                });
                return [2 /*return*/, res.status(200).json({ message: "Rating enviado com sucesso", data: enviarRating })];
            case 5:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_2.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sendPlayerRating = sendPlayerRating;
exports.default = { criarPlayer: exports.criarPlayer, atualizarPlayer: exports.atualizarPlayer, sendPlayerRating: exports.sendPlayerRating };
