import User from "../model/User"
const getUser = async (root:any,args:any) => {
    try{
        return await User.findById(args.id) 
    }catch(err){
        console.log(err)
    }
}
export {getUser}