import Head from 'next/head'
import Link from 'next/link'
import Login from '@/components/Login'
import Loader from '@/components/Loader'
import { IoBeer } from 'react-icons/io5'
import styles from '../../styles/Home.module.css'

import { globalContext } from '@/context/store'
import Periode from '@/components/Periode'

export default function Home() {
	const [state, dispatch] = globalContext()
	const { user, loading, periodes } = state
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
					{user && !user.token ? (
						<>
							<h1>Connectatzen</h1>
							<Login />
						</>
					) : (
						<>
							<h1>Admin</h1>
							<h2>Périodes enregistrées</h2>
							{periodes.map((periode) => (
								<Periode key={periode._id} periode={periode} />
							))}
						</>
					)}
				</main>
			)}

			<footer className={styles.footer}>
				<Link href='/'>
					<div className={styles.link}>
						<IoBeer />
						HOME
					</div>
				</Link>
			</footer>
		</div>
	)
}
