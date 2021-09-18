import {config} from 'dotenv'
config()
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {makeExecutableSchema} from '@graphql-tools/schema'
import { join } from 'path'
import {readFileSync} from 'fs'
import cors from 'cors'
import resolvers from './controllers/resolvers'
// import './db/connect'

// initials
const app = express()
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
`
const schema = makeExecutableSchema({typeDefs,resolvers})

// configs
// app.use(cors({optionsSuccessStatus: 200}))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use('/graphql',graphqlHTTP({
//     schema,
//     rootValue:resolvers,
//     graphiql:false
// }))

app.get('/',(req,res) => {
    res.send('hola mundo')
})

// server 
app.listen(process.env.PORT || 3000,() => 
    console.log('server conectado')
)