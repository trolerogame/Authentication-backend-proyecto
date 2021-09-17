"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    phone: String,
    passwordLength: String
});
exports.default = (0, mongoose_1.model)('User', User);
