import {
	registerPlayer,
	updatePlayer,
	getAllPlayers,
} from '@/controllers/playerController'
import nc from 'next-connect'
import dbConnect from '@/lib/dbConnect'
import { protect, admin } from '@/lib/auth'

dbConnect()

const handler = nc({ attachParams: true })

handler
	.get(async (req, res) => {
		getAllPlayers(req, res)
	})
	.post(async (req, res) => {
		await registerPlayer(req, res)
	})
	.put(protect, admin, async (req, res) => {
		await updatePlayer(req, res)
	})

export default handler
