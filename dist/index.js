"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var schema_1 = require("@graphql-tools/schema");
var path_1 = require("path");
var fs_1 = require("fs");
var cors_1 = __importDefault(require("cors"));
var resolvers_1 = __importDefault(require("./controllers/resolvers"));
require("./db/connect");
// initials
var app = (0, express_1.default)();
var typeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'schemas.graphql'), 'utf-8');
var schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers_1.default });
// configs
app.use((0, cors_1.default)());
app.use('/', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: resolvers_1.default,
    graphiql: false
}));
// server 
app.listen(process.env.PORT, function () {
    return console.log('server conectado');
});
