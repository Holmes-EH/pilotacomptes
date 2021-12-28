import {
	IoArrowForwardOutline,
	IoChevronDownCircleOutline,
	IoChevronUpCircleOutline,
} from 'react-icons/io5'
import styles from '@/styles/Periode.module.css'

import { globalContext } from '@/context/store'
import { useState } from 'react'

const PublicPeriode = ({ periode }) => {
	const [state] = globalContext()
	const { playerList } = state
	const { start, end, paid, amount, playersPaid, paidDate } = periode

	const [showDetails, setShowDetails] = useState(false)

	const dateToMonth = (date) => {
		return new Date(date).toLocaleDateString('fr-FR', {
			month: 'long',
			year: '2-digit',
		})
	}
	const playersNotPaid = playerList.filter(
		({ _id: id1 }) => !playersPaid.some(({ _id: id2 }) => id1 === id2)
	)
	return (
		<div
			className={`${styles.periode} ${
				paid ? styles.paid : styles.unpaid
			}`}
			onClick={() => setShowDetails(!showDetails)}
		>
			<div className={styles.date}>
				<p style={{ paddingRight: '5px' }}>
					{dateToMonth(start).charAt(0).toUpperCase() +
						dateToMonth(start).slice(1)}
				</p>
				<IoArrowForwardOutline />
				<p style={{ paddingLeft: '5px' }}>
					{dateToMonth(end).charAt(0).toUpperCase() +
						dateToMonth(end).slice(1)}
				</p>
			</div>
			<div className={styles.details}>
				<p>
					Cotisation réglée le{' '}
					{new Date(paidDate).toLocaleDateString('fr-FR', {
						day: 'numeric',
						month: 'short',
					})}
					{' = '}
					<b>{amount} €</b>
				</p>
				<p>
					Montant dû par joueur ={' '}
					<b>{amount / playerList.length} €</b>
				</p>
			</div>
			<div className={styles.recapDetails}>
				<div>
					{showDetails ? (
						<IoChevronUpCircleOutline />
					) : (
						<IoChevronDownCircleOutline />
					)}
				</div>
				{showDetails && (
					<div className={styles.recapTable}>
						<div style={{ width: '100%' }}>
							<p className={styles.recapHeader}>
								Ont payé <span>({playersPaid.length})</span>
							</p>
							{playersPaid.map((player) => {
								return <p key={player._id}>{player.name}</p>
							})}
						</div>
						<div
							style={{
								width: '100%',
								borderLeft: '1px solid white',
							}}
						>
							<p className={styles.recapHeader}>
								Restent à payer{' '}
								<span>({playersNotPaid.length})</span>
							</p>
							{playersNotPaid.map((player) => {
								return (
									<p
										key={player._id}
										style={{ paddingLeft: '10px' }}
									>
										{player.name}
									</p>
								)
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PublicPeriode
