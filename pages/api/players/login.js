import { authPlayer } from '@/controllers/playerController'
import nc from 'next-connect'
import dbConnect from '@/lib/dbConnect'

dbConnect()

const handler = nc({ attachParams: true })

handler.post(async (req, res) => {
	await authPlayer(req, res)
})

export default handler
