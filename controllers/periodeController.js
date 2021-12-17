import Periode from '@/models/periodeModel'
import Player from '@/models/playerModel'
import dbConnect from '@/lib/dbConnect'

dbConnect()

// @desc    Get periodes
// @route   GET /api/periodes
// @access  Public
const getPeriodes = async (req, res) => {
	const periodes = await Periode.find({
		numberOfPlayersPaid: { $lte: 10 },
	}).populate({
		path: 'playersPaid',
		select: ['name', 'tel'],
		model: Player,
	})
	if (periodes) {
		res.json(periodes)
	} else {
		res.status(404).json({
			message: "Aucune session à régler n'a été trouvée...",
		})
	}
}

// @desc    Add a new periode
// @route   POST /api/periodes
// @access  Protect + Admin
const addNewPeriode = async (req, res) => {
	const { start, end, amount, playersPaid, paidDate } = req.body

	const paid = req.body.paid || false

	const periodeExists = await Periode.findOne({ start, end })

	if (periodeExists) {
		res.status(400).json({ message: 'Cette période est déjà dans la base' })
	} else {
		const periode = await Periode.create({
			start,
			end,
			paid,
			paidDate,
			amount,
			playersPaid,
		})

		if (periode) {
			res.status(201).json({
				_id: periode._id,
				start: periode.start,
				end: periode.end,
				playersPaid: periode.playersPaid,
				paid: periode.paid,
				paidDate: periode.paidDate,
				amount: periode.amount,
			})
		} else {
			res.status(400).json({ message: 'Données période erronées' })
		}
	}
}

// @desc    Update Periode
// @route   PUT /api/periode
// @access  Private + Admin
const updatePeriode = async (req, res) => {
	const periode = await Periode.findById(req.body._id)

	if (periode) {
		periode.start = req.body.start || periode.start
		periode.end = req.body.end || periode.end
		periode.playersPaid = req.body.playersPaid || periode.playersPaid
		periode.paidDate = req.body.paidDate || periode.paidDate
		periode.paid = req.body.paid ? true : false

		const savedPeriode = await periode.save()
		const updatedPeriode = await Periode.findById(
			savedPeriode._id
		).populate({
			path: 'playersPaid',
			select: ['name', 'tel'],
			model: Player,
		})
		res.json({
			_id: updatedPeriode._id,
			start: updatedPeriode.start,
			end: updatedPeriode.end,
			playersPaid: updatedPeriode.playersPaid,
			numberOfPlayersPaid: updatedPeriode.numberOfPlayersPaid,
			paid: updatedPeriode.paid,
			paidDate: updatedPeriode.paidDate,
		})
	} else {
		res.status(404).json({
			message: 'Periode introuvable.\nCommence par la créer.',
		})
	}
}

export { getPeriodes, addNewPeriode, updatePeriode }
