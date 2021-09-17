"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const getUser = async (root, args) => {
    try {
        return await User_1.default.findById(args.id);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUser = getUser;
