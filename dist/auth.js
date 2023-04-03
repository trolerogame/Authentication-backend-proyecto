"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_express_1 = require("apollo-server-express");
const config_1 = require("./config");
exports.default = async ({ req, next }) => {
    if (!req.headers.authorization)
        return { permission: false };
    const values = req.headers.authorization?.split(' ');
    if (!values)
        return { permission: false };
    let verified = null;
    verified = jsonwebtoken_1.default.verify(values[1], config_1.config.secretKey);
    if (!verified)
        throw new apollo_server_express_1.AuthenticationError('Invalid Token');
    next && next();
    return {
        permission: true,
        data: verified,
    };
};
