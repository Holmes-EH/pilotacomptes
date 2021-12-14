import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const playerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	tel: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
	},
	password: {
		type: String,
	},
})

playerSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports =
	mongoose.models.Player || mongoose.model('Player', playerSchema)
