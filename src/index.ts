import {config} from 'dotenv'
config()
import express from 'express'
import {ApolloServer,gql} from 'apollo-server-express'
import cors from 'cors'
import resolvers from './controllers/resolvers'
import {typeDefs} from './model/TypeDefs'
import './db/connect'
// const typeDefs = gql`
// type User{
//     _id:ID,
//     username:String
//     email:String,
//     password:String,
//     bio:String,
//     phone:String,
//     passwordLength:String
// }
// type Query{
//     "devuelve un usuario"
//     getUser(id:ID!):User
// }
// input createUserType {
//     email:String!,
//     password:String!,
// }
// input editUserType {
//     username:String,
//     email:String,
//     password:String,
//     bio:String,
//     phone:String
// }

// type Mutation {
//     "crea un usuario"
//     createUser(input:createUserType):User
//     "edita el usuario"
//     editUser(id:ID!,input:editUserType):User
//     "elimina un usuario"
//     deleteUser(id:ID!):User
//     "logeamos un usuario"
//     loginUser(email:String,password:String):User
// }
// `
// initials
const app = express()
// configs
app.use(express.urlencoded({ extended: true }))
const server = new ApolloServer({
    resolvers,
    typeDefs,
})
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' })
})
app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send('hola mundo')
})

// server 
app.listen(process.env.PORT || 3000,() => 
    console.log('server conectado')
)