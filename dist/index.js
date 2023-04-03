"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const resolvers_1 = __importDefault(require("./controllers/resolvers"));
const auth_1 = __importDefault(require("./auth"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const cloudinary_1 = require("cloudinary");
require("./db/connect");
cloudinary_1.v2.config({
    cloud_name: config_1.config.cloudinaryCloudName,
    api_key: config_1.config.cloudinaryApiKey,
    api_secret: config_1.config.cloudinaryApiSecret
});
const storage = multer_1.default.diskStorage({
    destination: __dirname + '/uploads',
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname).toLowerCase());
    }
});
const upload = (0, multer_1.default)({ storage });
const typeDefs = (0, apollo_server_express_1.gql) `
  	scalar Upload
	type User {
		_id: ID
		username: String
		email: String
		password: String
		bio: String
		phone: String,
		photo:String,
		passwordLength: String
	}
	type Query {
		"devuelve un usuario"
		getUser: User
	}
	input createUserType {
		email: String!
		password: String!
	}
	input editUserType {
		username: String
		email: String
		password: String
		bio: String
		phone: String,
		photo:String,
	}

	type loginUserType {
		token:String,
		user:User,
		error:String
	}
	type returnUser {
		email: String, 
		password: String,
		error:String,
	}
	type returnEditType {
		token:String,
		error:String
	}
	type Mutation {
		"crea un usuario"
		createUser(input: createUserType):returnUser
		"edita el usuario"
		editUser(input: editUserType): returnEditType
		uploadFile(file:Upload):String,
		"elimina un usuario"
		deleteUser(id: ID!): User
		"logeamos un usuario"
		loginUser(email: String, password: String): loginUserType
	}
`;
// initials
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({
    resolvers: resolvers_1.default,
    typeDefs,
    context: auth_1.default,
});
// configs
app.use(express_1.default.static(path_1.default.join(__dirname, '/')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: config_1.config.originCors
}));
app.use(express_1.default.json());
// routes
app.post('/uploadFile/', upload.single('file'), async (req, res) => {
    if (!req.file)
        return res.json({ file: '' });
    const cloud = await cloudinary_1.v2.uploader.upload(req.file.path);
    res.json({ file: cloud.secure_url });
});
// server
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql', cors: {
            origin: config_1.config.originCors
        } });
});
app.listen(config_1.config.port || 3000, () => console.log('server conectado'));
