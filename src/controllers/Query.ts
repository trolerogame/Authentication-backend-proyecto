import User from '../model/User'
export const getUser = async (_: any, args: any, context: any) => {
	if (context.permission) {
		try {
			return await User.findById(context.data._id)
		} catch (err) {
			console.log(err)
		}
	}
}
