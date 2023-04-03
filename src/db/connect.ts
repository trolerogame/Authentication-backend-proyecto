import { connect } from 'mongoose'
import { config } from '../config';
;(async () => {
	try {
		await connect(config.serverDb!)
		console.log('base de dato conectado')
	} catch (err) {
		console.error(err)
	}
})()
