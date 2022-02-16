import bcrypt from 'bcrypt'

const encryptPassword = async (pass: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(pass, salt)
}
const validatePass = async (
	pass: string,
	encryptPass: string
): Promise<boolean> => await bcrypt.compare(pass, encryptPass)

export { encryptPassword, validatePass }
