import { Schema, model } from 'mongoose'

export interface UserInterface {
	username: string
	email: string
	password?: string
	bio: string
	phone: string
	passwordLength: string
	photo: string
}

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
