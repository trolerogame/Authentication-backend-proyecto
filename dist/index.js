"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const schema_1 = require("@graphql-tools/schema");
const cors_1 = __importDefault(require("cors"));
const resolvers_1 = __importDefault(require("./controllers/resolvers"));
require("./db/connect");
// initials
const app = (0, express_1.default)();
const typeDefs = `
    type User{
        _id:ID,
        username:String
        email:String,
        password:String,
        bio:String,
        phone:String,
        passwordLength:String
    }
    type Query{
        "devuelve un usuario"
        getUser(id:ID!):User
    }
    input createUserType {
        email:String!,
        password:String!,
    }
    input editUserType {
        username:String,
        email:String,
        password:String,
        bio:String,
        phone:String
    }

    type Mutation {
        "crea un usuario"
        createUser(input:createUserType):User
        "edita el usuario"
        editUser(id:ID!,input:editUserType):User
        "elimina un usuario"
        deleteUser(id:ID!):User
        "logeamos un usuario"
        loginUser(email:String,password:String):User
    }
`;
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers: resolvers_1.default });
// configs
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
