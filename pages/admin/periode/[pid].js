import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

import Loader from '@/components/Loader'
import NewPeriode from '@/components/NewPeriode'

import { globalContext } from '@/context/store'

import { IoBeer, IoConstruct, IoExit } from 'react-icons/io5'
import homeStyles from '@/styles/Home.module.css'
import styles from '@/styles/Pid.module.css'
import axios from 'axios'

const Periode = ({ data }) => {
	const [state, dispatch] = globalContext()
	const { user, playerList, loading, periodes } = state

	const logoutUser = () => {
		localStorage.removeItem('pilotaUser')
		dispatch({ type: 'USER_LOGOUT' })
	}

	useEffect(() => {
		dispatch({ type: 'DONE_LOADING' })
		if (typeof user === 'undefined' || user === null || !user.isAdmin) {
			router.push('/')
		}
	}, [dispatch, user])

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
					<NewPeriode periode={data} />
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
				{user && user._id && (
					<div className={homeStyles.link} onClick={logoutUser}>
						<IoExit />
						DECONNEXION
					</div>
				)}
			</footer>
		</div>
	)
}

// This gets called on every request
export async function getServerSideProps(context) {
	const { pid } = context.query
	const res = await fetch(`${process.env.SERVER}/api/periodes/${pid}`)
	const data = await res.json()

	return { props: { data } }
}

export default Periode
