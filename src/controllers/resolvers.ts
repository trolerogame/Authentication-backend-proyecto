import { getUser } from './Query'
import { createUser, editUser, loginUser,uploadFile } from './mutations'
import {GraphQLUpload} from 'graphql-upload'
export default {
	Upload:GraphQLUpload,
	Query: {
		getUser,
	},
	Mutation: {
		createUser,
		editUser,
		loginUser,
		uploadFile
	},
}
