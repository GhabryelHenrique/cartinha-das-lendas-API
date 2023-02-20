"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
new app_1.App().server.listen(3000, function () {
    console.log("Server is running on port 3000");
});
