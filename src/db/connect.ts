import {connect} from 'mongoose'

(async () => {
    try{
        await connect(process.env.SERVER!)
        console.log('base de dato conectado')
    }catch(err){
        console.error(err)
    }
})()