"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var PlayerSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    nickname: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    age: { type: Number, require: true },
    position: { type: String, require: true },
    rating: { type: Number, require: true },
    team: { type: String, require: true },
    variation: { type: Number, require: true },
    lastUpdate: { type: Date, require: true },
    history: { type: [{
                date: { type: Date, require: true },
                rating: { type: Number, require: true },
                variation: { type: Number, require: true }
            }], require: true },
    chatRatingAverage: { type: Number, require: true },
    chatRatings: { type: [{
                date: { type: Date, require: true },
                rating: { type: Number, require: true },
                user: { type: String, require: true },
                userEmail: { type: String, require: true }
            }], require: true },
    chatRatingHistory: { type: [{
                date: { type: Date, require: true },
                rating: { type: Number, require: true },
                variation: { type: Number, require: true }
            }], require: true }
});
exports.default = mongoose_1.default.model('Player', PlayerSchema);
