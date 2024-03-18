"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//  routes
app.get('/hello', function (req, res) {
    res.send('Task Manager App');
    res.end();
});
const PORT = 3000;
app.listen(PORT, function () {
    console.log(`The server is listerning on Port ${PORT}.......... `);
});
