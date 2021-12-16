import mongoose from 'mongoose'

const periodeSchema = mongoose.Schema({
	start: {
		type: String,
		required: true,
	},
	end: {
		type: String,
		required: true,
	},
	paid: {
		type: Boolean,
	},
	playersPaid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	numberOfPlayersPaid: {
		type: Number,
	},
})

periodeSchema.pre('save', async function (next) {
	if (!this.isModified('playersPaid')) {
		next()
	}
	this.numberOfPlayersPaid = this.playersPaid.length
})

module.exports =
	mongoose.models.Periode || mongoose.model('Periode', periodeSchema)
