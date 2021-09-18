import {config} from 'dotenv'
config()
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import cors from 'cors'
import {typeDefs} from './types'
import resolvers from './controllers/resolvers'
import './db/connect'

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