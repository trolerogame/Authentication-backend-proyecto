import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, NextFunction } from 'express'
import { AuthenticationError } from 'apollo-server-express'

export default async ({ req ,next }: { req: Request, next:NextFunction }) => {
	if(!req.headers.authorization) return { permission: false }
	const values = <string[]>req.headers.authorization?.split(' ')
	if (!values) return { permission: false }
	let verified: string | JwtPayload | null = null
	
	verified = jwt.verify(values[1], process.env.SECRET!)
	if (!verified) throw new AuthenticationError('Invalid Token')
	next && next()
	return {
		permission: true,
		data: verified,
	}
}
