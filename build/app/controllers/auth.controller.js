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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSuperAdmin = exports.logout = exports.refreshAccessToken = exports.login = exports.deletarUsuario = exports.atualizarUsuario = exports.criarUsuario = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var superAdmin_models_1 = __importDefault(require("../models/superAdmin.models"));
var users_model_1 = __importDefault(require("../models/users.model"));
var autenticateToken_utils_1 = require("../utils/autenticateToken.utils");
dotenv_1.default.config();
var criarUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, nickname, password, avatar, birthDate, isUserExist, saltRounds, hashedPassword, user, novoUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, nickname = _a.nickname, password = _a.password, avatar = _a.avatar, birthDate = _a.birthDate;
                return [4 /*yield*/, users_model_1.default.findOne({ email: email })];
            case 1:
                isUserExist = _b.sent();
                if (isUserExist)
                    return [2 /*return*/, res.status(400).json({ message: "Usuário já existe" })];
                saltRounds = 32;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 2:
                hashedPassword = _b.sent();
                user = new users_model_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    name: name,
                    email: email,
                    nickname: nickname,
                    password: hashedPassword,
                    avatar: avatar,
                    birthDate: birthDate,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ratings: []
                });
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user.save()];
            case 4:
                novoUser = _b.sent();
                return [2 /*return*/, res.status(201).json({ messagem: "Usuário criado com sucesso", data: novoUser })];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.criarUsuario = criarUsuario;
var atualizarUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, nickname, password, avatar, birthDate, id, saltRounds, hashedPassword, user, userAtualizado, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, nickname = _a.nickname, password = _a.password, avatar = _a.avatar, birthDate = _a.birthDate;
                id = req.params.id;
                if (!id)
                    return [2 /*return*/, res.status(400).json({ message: "ID não informado" })];
                saltRounds = 32;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 1:
                hashedPassword = _b.sent();
                user = users_model_1.default.findByIdAndUpdate(id, {
                    name: name,
                    nickname: nickname,
                    password: hashedPassword,
                    avatar: avatar,
                    birthDate: birthDate,
                    updatedAt: new Date()
                }, { new: true });
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user];
            case 3:
                userAtualizado = _b.sent();
                return [2 /*return*/, res.status(201).json({ messagem: "Usuário atualizado com sucesso", data: userAtualizado })];
            case 4:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_2.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.atualizarUsuario = atualizarUsuario;
var deletarUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id)
                    return [2 /*return*/, res.status(400).json({ message: "ID não informado" })];
                return [4 /*yield*/, users_model_1.default.findByIdAndDelete(id)];
            case 1:
                user = _a.sent();
                try {
                    return [2 /*return*/, res.status(201).json({ messagem: "Usuário deletado com sucesso" })];
                }
                catch (err) {
                    return [2 /*return*/, res.status(400).json({ message: err.message })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deletarUsuario = deletarUsuario;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordCorrect, _b, accessToken, refreshToken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, users_model_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "Usuário não existe" })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                isPasswordCorrect = _c.sent();
                if (!isPasswordCorrect)
                    return [2 /*return*/, res.status(400).json({ message: "Senha incorreta" })];
                _b = (0, autenticateToken_utils_1.generateTokens)(user), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // tempo de vida de 7 dias
                });
                return [2 /*return*/, res.status(200).json({ message: "Login realizado com sucesso", accessToken: accessToken })];
        }
    });
}); };
exports.login = login;
var refreshAccessToken = function (req, res) {
    var refreshToken = req.body.token;
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, payload) {
        if (err) {
            return res.sendStatus(403);
        }
        var accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });
        res.json({ accessToken: accessToken });
    });
};
exports.refreshAccessToken = refreshAccessToken;
var logout = function (req, res) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logout realizado com sucesso" });
};
exports.logout = logout;
var registerSuperAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, isAvaibleSuperUser, saltRounds, hashedPassword, superUser, novoSuperUser, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, superAdmin_models_1.default.find()];
            case 1:
                isAvaibleSuperUser = _b.sent();
                if (isAvaibleSuperUser.length > 0)
                    return [2 /*return*/, res.status(403).json({ message: "Super usuário já existe" })];
                saltRounds = 32;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 2:
                hashedPassword = _b.sent();
                superUser = new superAdmin_models_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    name: name,
                    email: email,
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, superUser.save()];
            case 4:
                novoSuperUser = _b.sent();
                return [2 /*return*/, res.status(201).json({ messagem: "Super usuário criado com sucesso", data: novoSuperUser })];
            case 5:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(400).json({ message: err_3.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerSuperAdmin = registerSuperAdmin;
exports.default = { criarUsuario: exports.criarUsuario, atualizarUsuario: exports.atualizarUsuario, deletarUsuario: exports.deletarUsuario, login: exports.login, refreshAccessToken: exports.refreshAccessToken, logout: exports.logout, registerSuperAdmin: exports.registerSuperAdmin };
