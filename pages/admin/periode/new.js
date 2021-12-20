import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Loader from '@/components/Loader'

import { globalContext } from '@/context/store'

import { IoBeer, IoConstruct, IoArrowBack, IoSaveSharp } from 'react-icons/io5'
import homeStyles from '@/styles/Home.module.css'
import styles from '@/styles/Pid.module.css'

const AddNewPeriode = () => {
	const router = useRouter()
	const [state, dispatch] = globalContext()
	const { user, loading, playerList, periodes } = state

	const [newStart, setNewStart] = useState('0')
	const [newEnd, setNewEnd] = useState('0')
	const [newPaid, setNewPaid] = useState(false)
	const [newAmount, setNewAmount] = useState(0)
	const [newPaidDate, setNewPaidDate] = useState('')
	const [newPlayersPaid, setNewPlayersPaid] = useState([])
	const [edited, setEdited] = useState(false)

	useEffect(() => {
		if (typeof user === 'undefined' || user === null || !user.isAdmin) {
			router.push('/')
		}
	})
	useEffect(() => {
		async function fetchData() {
			if (playerList && playerList.length === 0) {
				dispatch({ type: 'LOADING' })
				try {
					const { data } = await axios.get('/api/players')
					dispatch({ type: 'LIST_PLAYERS', payload: data })
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
			if (periodes && periodes.length === 0) {
				dispatch({ type: 'LOADING' })
				try {
					const { data } = await axios.get('/api/periodes')
					dispatch({ type: 'LIST_PERIODES', payload: data })
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
		fetchData()
	}, [periodes, dispatch, playerList])

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

	const addNewPeriode = async () => {
		dispatch({ type: 'LOADING' })
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
			const { data } = await axios.post(
				'/api/periodes',
				{
					start: newStart,
					end: newEnd,
					paid: newPaid,
					amount: newAmount,
					paidDate: newPaidDate,
					playersPaid: newPlayersPaid,
				},
				config
			)
			let updatedPeriodeList = [...periodes]
			updatedPeriodeList.push(data)
			updatedPeriodeList.sort((a, b) =>
				a.start > b.start ? 1 : b.start > a.start ? -1 : 0
			)
			setEdited(false)
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

	const confirmLeave = () => {
		if (edited) {
			if (
				window.confirm(
					'Tu as changé des trucs.\nTu veux les enregistrer ?'
				)
			) {
				addNewPeriode()
				router.push('/admin')
			} else {
				router.push('/admin')
			}
		} else {
			router.push('/admin')
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Pilota St André - Période</title>
				<meta
					name='description'
					content='Détail de la période sélectionée'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{loading ? (
				<Loader />
			) : (
				<main
					className={homeStyles.main}
					style={{ padding: '1em', paddingTop: '1em' }}
				>
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

					<div
						style={{
							width: '100%',
							maxWidth: '600px',
							paddingTop: '20px',
						}}
					>
						<div className={styles.twoColumns}>
							<div className={styles.monthSelect}>
								Début :
								<select
									name='start'
									value={
										newStart === '0'
											? '0'
											: new Date(newStart).getMonth() + 1
									}
									onChange={(e) => {
										setNewStart(
											`${new Date().getFullYear()}-${
												e.target.value.length === 2
													? e.target.value
													: `0${e.target.value}`
											}`
										)
										setEdited(true)
									}}
								>
									<option value='0'>
										--Choisis le mois--
									</option>
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
									value={
										newEnd === '0'
											? '0'
											: new Date(newEnd).getMonth() + 1
									}
									onChange={(e) => {
										setNewEnd(
											`${new Date().getFullYear()}-${
												e.target.value.length === 2
													? e.target.value
													: `0${e.target.value}`
											}`
										)
										setEdited(true)
									}}
								>
									<option value='13'>
										--Choisis le mois--
									</option>
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
								inputMode='numeric'
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
									typeof newPaidDate !== 'undefined'
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
					<button className={styles.button} onClick={addNewPeriode}>
						<IoSaveSharp />
					</button>
				</main>
			)}
			<footer className={homeStyles.footer}>
				<Link href='/' passHref>
					<div className={homeStyles.link}>
						<IoBeer />
						HOME
					</div>
				</Link>
				<Link href='/admin' passHref>
					<div className={homeStyles.link}>
						<IoConstruct />
						ADMIN
					</div>
				</Link>
			</footer>
		</div>
	)
}

export default AddNewPeriode
