import { getUser } from './Query'
import { createUser,editUser,loginUser } from './mutations'
export default {
    Query:{
        getUser
    },
    Mutation:{
        createUser,
        editUser,
        loginUser
    }
}