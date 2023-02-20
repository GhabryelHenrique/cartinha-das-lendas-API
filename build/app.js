"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var ratingPlayers_routes_1 = require("./app/routes/ratingPlayers.routes");
var dotenv_1 = __importDefault(require("dotenv"));
var auth_routes_1 = require("./app/routes/auth.routes");
var refreshRatings_utils_1 = require("./app/utils/refreshRatings.utils");
dotenv_1.default.config();
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
        this.connectDB();
        this.refreshRating();
    }
    App.prototype.middleware = function () {
        this.server.use(express_1.default.json());
    };
    App.prototype.connectDB = function () {
        // Connect to database
        mongoose_1.default.connect(process.env.MONGO_URL).then(function () {
            console.log("Connected to database");
        }).catch(function (err) {
            console.log("Error connecting to database", err);
        });
    };
    App.prototype.refreshRating = function () {
        // Refresh ratings
        (0, refreshRatings_utils_1.start)();
    };
    App.prototype.router = function () {
        this.server.use(ratingPlayers_routes_1.ratingPlayersRouter);
        this.server.use(auth_routes_1.authRouter);
    };
    return App;
}());
exports.App = App;
