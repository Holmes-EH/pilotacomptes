import {
	getPeriodes,
	addNewPeriode,
	updatePeriode,
	deletePeriode,
} from '@/controllers/periodeController'
import dbConnect from '@/lib/dbConnect'
import nc from 'next-connect'
import { protect, admin } from '@/lib/auth'

dbConnect()

const handler = nc({ attachParams: true })

handler
	.get(async (req, res) => {
		getPeriodes(req, res)
	})
	.post(protect, admin, async (req, res) => {
		await addNewPeriode(req, res)
	})
	.put(protect, admin, async (req, res) => {
		await updatePeriode(req, res)
	})
	.delete(protect, admin, async (req, res) => {
		await deletePeriode(req, res)
	})

export default handler
