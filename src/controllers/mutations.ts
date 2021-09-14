import User from "../model/User"
import {encryptPassword,validatePass} from '../functions/bcrypts'

const createUser = async (_:any,{input}:any) => {
    const {email,password} = input
    const passEncrypt = await encryptPassword(password)
    try{
        const newUser =  await User.create({
            username : email,
            email,
            password:passEncrypt,
            bio:'',
            phone:'',
            passwordLength:"*".repeat(password.length)
        })
        return newUser
    }catch(e){
        console.log(e)
    }
}
const editUser = async (_:any,{id,input}:any) => {
    const {username,email,password,bio,phone} = input
    try{
        const user = await User.findById(id) 
        if(!user) return 'no existe el usuario'
        await User.findByIdAndUpdate(id,{
            username: username || user.username,
            email: email || user.email,
            password: password ? (await encryptPassword(password)) : user.password,
            bio: bio || user.bio,
            phone: phone || user.phone,
            passwordLength:password ? "*".repeat(password.length) : user.passwordLength,
        })
        return await User.findById(id)
    }catch(err){
        console.log(err)
    }
}
const loginUser = async (_:any,{email,password}:any) => {
    try{
        const user = await User.findOne({email}) 
        if(!user) return 'este usuario no existe'
        const compare = await validatePass(password,user.password)
        if(!compare) return 'la contrasenia o el usuario no coinciden'
        return user
    }catch(err){
        console.log(err)
    }
}

export {createUser,editUser,loginUser}