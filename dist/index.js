"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importStar(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("@graphql-tools/schema");
const path_1 = require("path");
const fs_1 = require("fs");
const cors_1 = __importDefault(require("cors"));
const resolvers_1 = __importDefault(require("./controllers/resolvers"));
require("./db/connect");
// initials
const app = (0, express_1.default)();
const typeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'schemas.graphql'), 'utf-8');
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers: resolvers_1.default });
// configs
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: resolvers_1.default,
    graphiql: false
}));
app.get('/', (req, res) => {
    res.send('hola mundo');
});
// server 
app.listen(process.env.PORT || 3000, () => console.log('server conectado'));
