import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export const encryptPassword = async (pass: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(pass, salt)
}
export const validatePass = async (
	pass: string,
	encryptPass: string
): Promise<boolean> => await bcrypt.compare(pass, encryptPass)


export const createToken = async (_id:string) => {
	const jwtData: string = await jwt.sign(
		JSON.stringify({_id}),
		config.secretKey!
	)
	return jwtData
}


