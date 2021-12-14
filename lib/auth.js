import Player from '@/models/playerModel'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/dbConnect.js'

dbConnect()

const protect = async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			jwt.verify(token, process.env.JWT_SECRET)

			next()
		} catch (error) {
			res.status(401).json({
				message: 'Non autorisé.\nVeuillez vous reconnecter.',
			})
		}
	}

	if (!token) {
		res.status(401).json({ message: 'Non autorisé, pas de token' })
	}
}

const admin = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		const token = req.headers.authorization.split(' ')[1]

		var decoded = jwt.verify(token, process.env.JWT_SECRET)
		var userId = decoded.id
		const user = await Player.findById(userId)

		if (user.isAdmin) {
			next()
		} else {
			res.status(401).json({
				message: 'Non autorisé - Administrateurs seulement',
			})
		}
	} else {
		res.status(401).json({
			message: `Non autorisé - Vous devez être connecté \n ${err}`,
		})
	}
}

export { protect, admin }
