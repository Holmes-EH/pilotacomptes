import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
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
})

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
