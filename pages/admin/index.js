import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Login from '@/components/Login'
import Loader from '@/components/Loader'
import Toaster from '@/components/Toaster'
import { IoBeer, IoAddCircleOutline } from 'react-icons/io5'
import styles from '../../styles/Home.module.css'

import { globalContext } from '@/context/store'
import axios from 'axios'

import Periode from '@/components/Periode'
import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()
	const [state, dispatch] = globalContext()
	const { user, loading, periodes, playerList, message } = state

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
				<title>Pilota St André - Admin</title>
				<meta
					name='description'
					content="Partie admin de l'app pour gérer les périodes et suivre les paiements des participants"
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{loading ? (
				<Loader />
			) : (
				<main className={styles.main}>
					{message && message.text && <Toaster />}
					{typeof user === 'undefined' || user === null ? (
						<>
							<h1>Connectatzen</h1>
							<Login />
						</>
					) : (
						<>
							<h2>Périodes en cours</h2>
							{periodes.map((periode) =>
								typeof periode.start !== 'undefined' ? (
									<Periode
										key={periode._id}
										periode={periode}
									/>
								) : (
									<h3 key={'noPeriode'}>
										Aucun trimestre trouvée ...
									</h3>
								)
							)}
							<div
								className={styles.addPeriode}
								onClick={() => {
									router.push('/admin/periode/new')
								}}
							>
								<IoAddCircleOutline />
								Ajouter un trimestre
							</div>
						</>
					)}
				</main>
			)}

			<footer className={styles.footer}>
				<Link href='/' passHref>
					<div className={styles.link}>
						<IoBeer />
						HOME
					</div>
				</Link>
			</footer>
		</div>
	)
}
