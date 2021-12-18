import Head from 'next/head'
import Link from 'next/link'
import Loader from '@/components/Loader'
import Logo from '../public/icons/icon.svg'
import { IoConstruct } from 'react-icons/io5'
import styles from '../styles/Home.module.css'

import { globalContext } from '@/context/store'

import axios from 'axios'
import { useEffect } from 'react'

export default function Home() {
	const [state, dispatch] = globalContext()

	const { playerList, loading, periodes } = state

	useEffect(async () => {
		if (playerList && playerList.length === 0) {
			dispatch({ type: 'LOADING' })
			try {
				const { data } = await axios.get('/api/players')
				dispatch({ type: 'LIST_PLAYERS', payload: data })
				dispatch({ type: 'DONE_LOADING' })
			} catch (error) {
				dispatch({ type: 'DONE_LOADING' })
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
			}
		}
	}, [])

	return (
		<div className={styles.container}>
			<Head>
				<title>Pilota St André - comptes</title>
				<meta
					name='description'
					content='Une app pour suivre les comptes pour le créneau de samedi / 11h'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{loading && <Loader />}
			<main className={styles.main}>
				<h1>Aupa Txapeldun !</h1>
				<Logo />
			</main>

			<footer className={styles.footer}>
				<Link href='/admin'>
					<div className={styles.link}>
						<IoConstruct />
						ADMIN
					</div>
				</Link>
			</footer>
		</div>
	)
}
