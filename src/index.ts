import { config } from 'dotenv'
config()
import express,{Response,Request} from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import cors from 'cors'
import resolvers from './controllers/resolvers'
import auth from './auth'
import path from 'path'
import multer from 'multer'
import { v4 } from 'uuid'
// import {Deta} from 'deta'
import './db/connect'
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})



// const deta = Deta('')
// const db = deta.Base('simpleDB')


const storage = multer.diskStorage({
	destination: __dirname + '/uploads',
	filename: (req,file,cb) => {
		cb(null, v4() + path.extname(file.originalname).toLowerCase())
	}
})
const upload = multer({storage})

const typeDefs = gql`
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
`
// initials
const app = express()
const server = new ApolloServer({
	resolvers,
	typeDefs,
	context: auth,
})
// configs

app.use(express.static(path.join(__dirname,'/')))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
	origin:"https://authentication-frontend-proyecto.vercel.app"
}))
app.use(express.json())
 

// routes

app.post('/uploadFile/',upload.single('file'),async (req:Request,res:Response) => {
	if(!req.file) return res.json({file:''})
	const cloud = await cloudinary.uploader.upload(req.file.path)
	res.json({file:cloud.secure_url})
})

// server
server.start().then(() => {
	server.applyMiddleware({ app, path: '/graphql',cors:{
		origin:'https://authentication-frontend-proyecto.vercel.app'
	} })
})
app.listen(process.env.PORT || 3000, () => console.log('server conectado'))