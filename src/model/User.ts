import { Schema, model } from 'mongoose'
import { UserInterface } from '../type'


const User = new Schema({
	username: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	bio: String,
	phone: String,
	passwordLength: String,
	photo: String,
})

export default model<UserInterface>('User', User)
