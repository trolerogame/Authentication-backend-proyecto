"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.loginUser = exports.editUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const createUser = async (_, { input }) => {
    const { email, password } = input;
    const passEncrypt = await (0, utils_1.encryptPassword)(password);
    try {
        await User_1.default.create({
            username: email?.split('@')[0],
            email,
            password: passEncrypt,
            bio: '',
            phone: '',
            photo: '',
            passwordLength: '*'.repeat(password?.length),
        });
        return input;
    }
    catch (e) {
        return {
            error: 'este usuario ya existe'
        };
    }
};
exports.createUser = createUser;
const editUser = async (root, { input }, context) => {
    if (context.permission) {
        const { username, email, password, bio, phone, photo } = input;
        const { _id: id } = context.data;
        try {
            const user = await User_1.default.findById(id);
            await User_1.default.findByIdAndUpdate(id, {
                username: username || user?.username,
                email: email || user?.email,
                password: password
                    ? await (0, utils_1.encryptPassword)(password)
                    : user?.password,
                bio: bio || user?.bio,
                phone: phone || user?.phone,
                photo: photo ? photo : user?.photo,
                passwordLength: password
                    ? '*'.repeat(password.length)
                    : user?.passwordLength,
            });
            return {
                token: (0, utils_1.createToken)(id)
            };
        }
        catch (err) {
            return {
                error: 'El usuario ya existe',
            };
        }
    }
};
exports.editUser = editUser;
const loginUser = async (_, { email, password }) => {
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            throw new Error('Este usuario no existe');
        const compare = await (0, utils_1.validatePass)(password, user.password);
        if (!compare)
            throw new Error('la contraseña o el email no coinciden');
        return {
            token: (0, utils_1.createToken)(user._id),
            user: user
        };
    }
    catch (err) {
        return {
            error: err.message,
        };
    }
};
exports.loginUser = loginUser;
const uploadFile = async (_, { file }, context) => {
    // if(context.permission){
    if (!file)
        return 'ingrese el archivo';
    if (!path_1.default.extname(file.originalname).match(/jpg|png|jfif|jpeg/g))
        return 'formato incorrecto';
    const { createReadStream, originalname } = file;
    const stream = createReadStream();
    const name = (0, uuid_1.v4)();
    const pathName = path_1.default.join(__dirname, `/uploads/${name}` + path_1.default.extname(originalname));
    await stream.pipe(fs_1.default.createWriteStream(pathName));
    return name;
    // }
};
exports.uploadFile = uploadFile;
