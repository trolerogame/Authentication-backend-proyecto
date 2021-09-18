"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const fs_1 = require("fs");
// import './db/connect'
// initials
const app = (0, express_1.default)();
const typeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'schemas.graphql'), 'utf-8');
// const schema = makeExecutableSchema({typeDefs,resolvers})
// configs
// app.use(cors({optionsSuccessStatus: 200}))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use('/graphql',graphqlHTTP({
//     schema,
//     rootValue:resolvers,
//     graphiql:false
// }))
app.get('/', (req, res) => {
    res.send('hola mundo');
});
// server 
app.listen(process.env.PORT || 3000, () => console.log('server conectado'));
