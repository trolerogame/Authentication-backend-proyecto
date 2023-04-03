export type UserType = {
	_id?: string
	username?: string
	email?: string
	password?: string
	bio?: string
	passwordLength?: string
	phone?: string
	photo?: string
}

export interface UserInterface {
	username: string
	email: string
	password?: string
	bio: string
	phone: string
	passwordLength: string
	photo: string
}