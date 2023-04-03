import User from '../model/User'
import { encryptPassword, validatePass, createToken } from '../utils'
import { UserType } from '../type'
import path from 'path'
import fs from 'fs'
import {v4 as uuidv4} from 'uuid'

export const createUser = async (_: any, { input }: {input:UserType}) => {
	const { email, password } = input
	const passEncrypt = await encryptPassword(password!)
	try {
		await User.create({
			username: email?.split('@')[0],
			email,
			password: passEncrypt,
			bio: '',
			phone: '',
			photo: '',
			passwordLength: '*'.repeat(password?.length!),
		})
		return input
	} catch (e) {
		return {
			error:'este usuario ya existe'
		}
	}
}

export const editUser = async (
	root: any,
	{ input }: any,
	context: any
) => {
	if (context.permission) {
		const { username, email, password, bio, phone, photo } = input
		 
		const { _id: id } = context.data
		try {		
			const user = await User.findById(id)!
			await User.findByIdAndUpdate(id, {
				username: username || user?.username,
				email: email || user?.email,
				password: password
					? await encryptPassword(password)
					: user?.password,
				bio: bio || user?.bio,
				phone: phone || user?.phone,
				photo: photo ? photo : user?.photo,
				passwordLength: password
					? '*'.repeat(password.length)
					: user?.passwordLength,
			})
			return {
				token:createToken(id)
			}
		} catch (err:any) {
			return {
				error:'El usuario ya existe',
			}
		}
	}
}

export const loginUser = async (
	_: any,
	{ email, password }: { email: string; password: string }
) => {
	try {
		const user:UserType|null = await User.findOne({ email })
		if (!user) throw new Error('Este usuario no existe')
		const compare = await validatePass(password, user.password!)
		if (!compare) throw new Error('la contraseña o el email no coinciden')
		return {
			token:createToken(user._id!),
			user:user
		}
	} catch (err:any) {
		return {
			error:err.message,
		}
	}
}

export const uploadFile = async (_: any, { file }: any,context:any) => {
	// if(context.permission){
		if (!file) return 'ingrese el archivo'
		if (!path.extname(file.originalname).match(/jpg|png|jfif|jpeg/g))
			return 'formato incorrecto'
		const {createReadStream, originalname} = file
		const stream = createReadStream()
		const name = uuidv4()
		const pathName = path.join(__dirname, `/uploads/${name}` + path.extname(originalname))
		await stream.pipe(fs.createWriteStream(pathName))
		return name
	// }
}
