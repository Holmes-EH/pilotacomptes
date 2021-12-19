import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'

import { globalContext } from '@/context/store'

import { IoArrowBack, IoSaveSharp, IoTrash } from 'react-icons/io5'
import styles from '@/styles/Pid.module.css'

const NewPeriode = ({ periode }) => {
	const router = useRouter()
	const [state, dispatch] = globalContext()
	const { user, periodes, playerList } = state

	const { start, end, paid, amount, paidDate, playersPaid } = periode

	const [newStart, setNewStart] = useState(start)
	const [newEnd, setNewEnd] = useState(end)
	const [newPaid, setNewPaid] = useState(paid)
	const [newAmount, setNewAmount] = useState(amount)
	const [newPaidDate, setNewPaidDate] = useState(paidDate)
	const [newPlayersPaid, setNewPlayersPaid] = useState(playersPaid)
	const [edited, setEdited] = useState(false)

	const updatePaidList = (player) => {
		setEdited(true)
		if (newPlayersPaid.some((el) => el._id === player._id)) {
			const newPaidList = newPlayersPaid.filter(
				(el) => el._id !== player._id
			)
			setNewPlayersPaid(newPaidList)
		} else {
			const newPaidList = [...newPlayersPaid]
			newPaidList.push(player)
			setNewPlayersPaid(newPaidList)
		}
	}

	const updatePeriode = async () => {
		dispatch({ type: 'LOADING' })
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.put(
				'/api/periodes',
				{
					_id: periode._id,
					start: newStart,
					end: newEnd,
					paid: newPaid,
					amount: newAmount,
					paidDate: newPaidDate,
					playersPaid: newPlayersPaid,
				},
				config
			)
			setEdited(false)
			let updatedPeriodeList = periodes.filter(
				(el) => el._id !== periode._id
			)
			updatedPeriodeList.push(data)
			updatedPeriodeList.sort((a, b) =>
				a.start > b.start ? 1 : b.start > a.start ? -1 : 0
			)
			dispatch({ type: 'LIST_PERIODES', payload: updatedPeriodeList })
			dispatch({ type: 'DONE_LOADING' })
			router.push('/admin')
		} catch (error) {
			dispatch({ type: 'DONE_LOADING' })
			dispatch({
				type: 'MESSAGE',
				payload: {
					type: 'error',
					text:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				},
			})
		}
	}

	const deletePeriode = async () => {
		if (window.confirm('Es-tu sûr de vouloir supprimer cette période ?')) {
			router.push('/admin')
			dispatch({ type: 'LOADING' })
			try {
				await axios.delete('/api/periodes', {
					data: { _id: periode._id },
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				let updatedPeriodeList = periodes.filter(
					(el) => el._id !== periode._id
				)
				dispatch({ type: 'LIST_PERIODES', payload: updatedPeriodeList })
				dispatch({ type: 'DONE_LOADING' })
			} catch (error) {
				dispatch({ type: 'DONE_LOADING' })
				dispatch({
					type: 'MESSAGE',
					payload: {
						type: 'error',
						text:
							error.response && error.response.data.message
								? error.response.data.message
								: error.message,
					},
				})
			}
		}
	}

	const confirmLeave = () => {
		if (edited) {
			if (
				window.confirm(
					'Tu as changé des trucs.\nTu veux les enregistrer ?'
				)
			) {
				updatePeriode()
				router.push('/admin')
			} else {
				router.push('/admin')
			}
		} else {
			router.push('/admin')
		}
	}
	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1em',
					fontWeight: '700',
					position: 'absolute',
					top: '6px',
					left: '1em',
				}}
				onClick={() => confirmLeave()}
			>
				<IoArrowBack />
				Retour
			</div>

			<div style={{ width: '100%', maxWidth: '600px' }}>
				<div className={styles.twoColumns}>
					<div className={styles.monthSelect}>
						Début :
						<select
							name='start'
							value={new Date(newStart).getMonth() + 1}
							onChange={(e) => {
								setNewStart(
									`${new Date().getFullYear()}-${
										e.target.value
									}`
								)
								setEdited(true)
							}}
						>
							<option value='1'>Janvier</option>
							<option value='2'>Février</option>
							<option value='3'>Mars</option>
							<option value='4'>Avril</option>
							<option value='5'>Mai</option>
							<option value='6'>Juin</option>
							<option value='7'>Juillet</option>
							<option value='8'>Août</option>
							<option value='9'>Septembre</option>
							<option value='10'>Octobre</option>
							<option value='11'>Novembre</option>
							<option value='12'>Décembre</option>
						</select>
					</div>
					<div className={styles.monthSelect}>
						Fin :
						<select
							name='end'
							value={new Date(newEnd).getMonth() + 1}
							onChange={(e) => {
								setNewEnd(e.target.value)
								setEdited(true)
							}}
						>
							<option value='1'>Janvier</option>
							<option value='2'>Février</option>
							<option value='3'>Mars</option>
							<option value='4'>Avril</option>
							<option value='5'>Mai</option>
							<option value='6'>Juin</option>
							<option value='7'>Juillet</option>
							<option value='8'>Août</option>
							<option value='9'>Septembre</option>
							<option value='10'>Octobre</option>
							<option value='11'>Novembre</option>
							<option value='12'>Décembre</option>
						</select>
					</div>
				</div>
				<div className={styles.twoColumns}>
					<label htmlFor='paid'>Période payée</label>
					<input
						type='checkbox'
						name='paid'
						checked={newPaid ? 'checked' : ''}
						onChange={(e) => {
							setNewPaid(!newPaid)
							setEdited(true)
						}}
					/>
				</div>
				<div className={styles.twoColumns}>
					<label htmlFor='amount'>Montant Payé</label>
					<input
						type='number'
						name='amount'
						value={newAmount}
						onChange={(e) => {
							setNewAmount(e.target.value)
							setEdited(true)
						}}
					/>
				</div>
				<div className={styles.twoColumns}>
					<label htmlFor='paidDate'>Date du paiement:</label>
					<input
						type='date'
						name='paidDate'
						value={
							typeof newPaidDate !== 'undefined' &&
							newPaidDate !== null
								? newPaidDate.slice(0, 10)
								: ''
						}
						onChange={(e) => {
							setNewPaidDate(e.target.value)
							setEdited(true)
						}}
					/>
				</div>
				<h3 style={{ textAlign: 'center' }}>A payé :</h3>
				<div className={styles.paidList}>
					{playerList.map((player) => {
						return (
							<div
								key={player._id}
								className={`${styles.player} ${
									newPlayersPaid.some(
										(el) => el._id === player._id
									)
										? styles.hasPaid
										: styles.hasNotPaid
								}`}
								onClick={() => updatePaidList(player)}
							>
								{player.name}
							</div>
						)
					})}
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					gap: '3em',
				}}
			>
				<button className={styles.button} onClick={updatePeriode}>
					<IoSaveSharp />
				</button>
				<button
					className={`${styles.button} ${styles.danger}`}
					onClick={deletePeriode}
				>
					<IoTrash />
				</button>
			</div>
		</>
	)
}

export default NewPeriode
