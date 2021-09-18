"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
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
