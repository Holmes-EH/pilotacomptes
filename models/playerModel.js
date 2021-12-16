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

playerSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

module.exports =
	mongoose.models.Player || mongoose.model('Player', playerSchema)
