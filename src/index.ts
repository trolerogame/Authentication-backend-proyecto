import {config} from 'dotenv'
config()
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {makeExecutableSchema} from '@graphql-tools/schema'
import { join } from 'path'
import {readFileSync} from 'fs'
import cors from 'cors'
import resolvers from './controllers/resolvers'
import './db/connect'

// initials
const app = express()
const typeDefs = readFileSync(join(__dirname,'schemas.graphql'),'utf-8')
const schema = makeExecutableSchema({typeDefs,resolvers})

// configs
app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema,
    rootValue:resolvers,
    graphiql:false
}))

app.get('/',(req,res) => {
    res.send('hola mundo')
})

// server 
app.listen(process.env.PORT || 3000,() => 
    console.log('server conectado')
)