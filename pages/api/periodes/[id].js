import { getPeriode } from '@/controllers/periodeController'
import dbConnect from '@/lib/dbConnect'
import nc from 'next-connect'

dbConnect()

const handler = nc({ attachParams: true })

handler.get(async (req, res) => {
	getPeriode(req, res)
})
export default handler
