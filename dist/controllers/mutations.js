"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.editUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcrypts_1 = require("../functions/bcrypts");
const createUser = async (_, { input }) => {
    const { email, password } = input;
    const passEncrypt = await (0, bcrypts_1.encryptPassword)(password);
    try {
        const newUser = await User_1.default.create({
            username: email,
            email,
            password: passEncrypt,
            bio: '',
            phone: '',
            passwordLength: "*".repeat(password.length)
        });
        return newUser;
    }
    catch (e) {
        console.log(e);
    }
};
exports.createUser = createUser;
const editUser = async (_, { id, input }) => {
    const { username, email, password, bio, phone } = input;
    try {
        const user = await User_1.default.findById(id);
        if (!user)
            return 'no existe el usuario';
        await User_1.default.findByIdAndUpdate(id, {
            username: username || user.username,
            email: email || user.email,
            password: password ? (await (0, bcrypts_1.encryptPassword)(password)) : user.password,
            bio: bio || user.bio,
            phone: phone || user.phone,
            passwordLength: password ? "*".repeat(password.length) : user.passwordLength,
        });
        return await User_1.default.findById(id);
    }
    catch (err) {
        console.log(err);
    }
};
exports.editUser = editUser;
const loginUser = async (_, { email, password }) => {
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return 'este usuario no existe';
        const compare = await (0, bcrypts_1.validatePass)(password, user.password);
        if (!compare)
            return 'la contrasenia o el usuario no coinciden';
        return user;
    }
    catch (err) {
        console.log(err);
    }
};
exports.loginUser = loginUser;
