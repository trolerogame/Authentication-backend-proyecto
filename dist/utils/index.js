"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.validatePass = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const encryptPassword = async (pass) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return await bcrypt_1.default.hash(pass, salt);
};
exports.encryptPassword = encryptPassword;
const validatePass = async (pass, encryptPass) => await bcrypt_1.default.compare(pass, encryptPass);
exports.validatePass = validatePass;
const createToken = async (_id) => {
    const jwtData = await jsonwebtoken_1.default.sign(JSON.stringify({ _id }), config_1.config.secretKey);
    return jwtData;
};
exports.createToken = createToken;
